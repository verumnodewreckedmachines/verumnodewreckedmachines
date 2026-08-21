export type AIProviderName = "anthropic" | "huggingface" | "mistral" | "gemini" | "deepseek" | "elevenlabs";

export interface ProviderRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  signal?: AbortSignal;
}

export interface ProviderResponse {
  provider: AIProviderName;
  model: string;
  text: string;
  inputTokens?: number;
  outputTokens?: number;
  durationMs: number;
}

export interface ProviderFailure {
  provider: AIProviderName;
  model?: string;
  code: "CONFIGURATION" | "TIMEOUT" | "RATE_LIMIT" | "UPSTREAM" | "INVALID_RESPONSE" | "CIRCUIT_OPEN";
  retryable: boolean;
  message: string;
}

export interface AIProvider {
  readonly name: AIProviderName;
  generate(request: ProviderRequest): Promise<ProviderResponse>;
}
