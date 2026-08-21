export interface RuntimeProviderConfig {
  anthropicApiKey?: string;
  deepseekApiKey?: string;
  mistralApiKey?: string;
  googleApiKey?: string;
  elevenLabsApiKey?: string;
  elevenLabsVoiceId?: string;
}

const runtimeConfig: RuntimeProviderConfig = {};

export function updateRuntimeProviderConfig(updates: RuntimeProviderConfig): void {
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      runtimeConfig[key as keyof RuntimeProviderConfig] = value.trim() || undefined;
    }
  }
}

export function getRuntimeProviderConfig(): RuntimeProviderConfig {
  return { ...runtimeConfig };
}

export function getConfiguredProviderStatus(): Record<keyof RuntimeProviderConfig, boolean> {
  const config = getRuntimeProviderConfig();
  return {
    anthropicApiKey: Boolean(config.anthropicApiKey || process.env.ANTHROPIC_API_KEY),
    deepseekApiKey: Boolean(config.deepseekApiKey || process.env.DEEPSEEK_API_KEY),
    mistralApiKey: Boolean(config.mistralApiKey || process.env.MISTRAL_API_KEY),
    googleApiKey: Boolean(config.googleApiKey || process.env.GOOGLE_API_KEY),
    elevenLabsApiKey: Boolean(config.elevenLabsApiKey || process.env.ELEVENLABS_API_KEY),
    elevenLabsVoiceId: Boolean(config.elevenLabsVoiceId || process.env.ELEVENLABS_VOICE_ID),
  };
}
