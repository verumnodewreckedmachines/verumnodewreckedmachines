import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { CircuitBreaker } from "./circuit-breaker";

const CACHE_DIR = path.resolve("uploads", "tts-cache");
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

export interface TtsAudio {
  audio: Buffer;
  contentType: "audio/mpeg";
  cacheKey: string;
  cached: boolean;
  voiceId: string;
}

export class ElevenLabsTtsProvider {
  private apiKey = process.env.ELEVENLABS_API_KEY || "";
  private voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  private readonly circuit = new CircuitBreaker("elevenlabs");
  private client: ElevenLabsClient | null;

  constructor() {
    this.client = this.createClient();
  }

  configure(apiKey: string, voiceId?: string): void {
    this.apiKey = apiKey;
    if (voiceId?.trim()) this.voiceId = voiceId.trim();
    this.client = this.createClient();
  }

  private createClient(): ElevenLabsClient | null {
    return this.apiKey
      ? new ElevenLabsClient({ apiKey: this.apiKey, timeoutInSeconds: 30, maxRetries: 0 })
      : null;
  }

  async synthesize(text: string, language = "pt-BR"): Promise<TtsAudio> {
    const cacheKey = crypto
      .createHash("sha256")
      .update(JSON.stringify({ text, language, voiceId: this.voiceId, model: "eleven_multilingual_v2" }))
      .digest("hex");
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`);

    try {
      const audio = await fs.readFile(cachePath);
      return { audio, contentType: "audio/mpeg", cacheKey, cached: true, voiceId: this.voiceId };
    } catch {
      // Cache miss: request a fresh synthesis.
    }

    const result = await this.circuit.execute(async () => {
      if (!this.apiKey) throw new Error("ELEVENLABS_API_KEY not configured");

      if (!this.client) throw new Error("ELEVENLABS_API_KEY not configured");

      const stream = await this.client.textToSpeech.convert(this.voiceId, {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }, { timeoutInSeconds: 30, maxRetries: 0 });
      const reader = stream.getReader();
      const chunks: Buffer[] = [];
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        chunks.push(Buffer.from(chunk.value));
      }
      return Buffer.concat(chunks);
    });

    if (typeof result !== "object" || !Buffer.isBuffer(result)) {
      throw new Error("ElevenLabs TTS unavailable");
    }

    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(cachePath, result);
    return { audio: result, contentType: "audio/mpeg", cacheKey, cached: false, voiceId: this.voiceId };
  }
}

export const elevenLabsTtsProvider = new ElevenLabsTtsProvider();
