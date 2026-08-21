import type { ProviderFailure } from "./provider-contract";

export type CircuitState = "closed" | "open" | "half-open";

export class CircuitOpenError extends Error {
  constructor(public readonly provider: string) {
    super(`Circuit open for provider ${provider}`);
    this.name = "CircuitOpenError";
  }
}

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private consecutiveFailures = 0;
  private openedAt = 0;

  constructor(
    private readonly provider: string,
    private readonly failureThreshold = 5,
    private readonly openDurationMs = 30_000,
  ) {}

  getState(): CircuitState {
    if (this.state === "open" && Date.now() - this.openedAt >= this.openDurationMs) {
      this.state = "half-open";
    }
    return this.state;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T | ProviderFailure> {
    const state = this.getState();
    if (state === "open") {
      return this.failure("CIRCUIT_OPEN", false, "Provider circuit is open");
    }

    try {
      const result = await operation();
      this.consecutiveFailures = 0;
      this.state = "closed";
      return result;
    } catch (error) {
      this.consecutiveFailures += 1;
      if (this.consecutiveFailures >= this.failureThreshold) {
        this.state = "open";
        this.openedAt = Date.now();
      }
      return this.failure(
        error instanceof Error && error.name === "TimeoutError" ? "TIMEOUT" : "UPSTREAM",
        true,
        error instanceof Error ? error.message : "Provider request failed",
      );
    }
  }

  private failure(code: ProviderFailure["code"], retryable: boolean, message: string): ProviderFailure {
    return {
      provider: this.provider as ProviderFailure["provider"],
      code,
      retryable,
      message,
    };
  }
}
