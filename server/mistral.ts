import { CircuitBreaker } from "./circuit-breaker";
import { getRuntimeProviderConfig } from "./runtime-config";

const PROVIDER_TIMEOUT_MS = 30_000;

export class MistralProvider {
  private apiKey = process.env.MISTRAL_API_KEY || "";
  private readonly circuit = new CircuitBreaker("mistral");

  constructor() {
    // Check runtime config as fallback
    const runtimeConfig = getRuntimeProviderConfig();
    if (runtimeConfig.mistralApiKey) {
      this.apiKey = runtimeConfig.mistralApiKey;
    }
  }

  configure(apiKey: string): void {
    this.apiKey = apiKey;
  }

  async generate(prompt: string): Promise<string> {
    const normalizedPrompt = prompt.trim().slice(0, 12_000);
    if (!normalizedPrompt) throw new Error("Mistral prompt is required");

    const result = await this.circuit.execute(async () => {
      if (!this.apiKey) throw new Error("MISTRAL_API_KEY not configured");

      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-large-latest",
          messages: [{ role: "user", content: normalizedPrompt }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("Mistral returned an empty response");
      return content;
    });

    return typeof result === "string" ? result : JSON.stringify(result);
  }
}

export const mistralProvider = new MistralProvider();
