import { CircuitBreaker } from "./circuit-breaker";

export interface DuckSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface DuckSearchResponse {
  query: string;
  abstract: string;
  abstractUrl: string;
  results: DuckSearchResult[];
  source: "duckduckgo";
}

interface DuckApiResponse {
  AbstractText?: string;
  AbstractURL?: string;
  RelatedTopics?: Array<{
    Text?: string;
    FirstURL?: string;
    Topics?: Array<{ Text?: string; FirstURL?: string }>;
  }>;
}

export class DuckSearchProvider {
  private readonly circuit = new CircuitBreaker("duckduckgo");

  async search(query: string): Promise<DuckSearchResponse> {
    const result = await this.circuit.execute(async () => {
      const url = new URL("https://api.duckduckgo.com/");
      url.searchParams.set("q", query);
      url.searchParams.set("format", "json");
      url.searchParams.set("no_html", "1");
      url.searchParams.set("skip_disambig", "1");

      const response = await fetch(url, {
        headers: { "User-Agent": "VERUM-NODE/1.0" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error(`DuckDuckGo API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as DuckApiResponse;
      const topics = (data.RelatedTopics || []).flatMap(topic =>
        topic.Topics || topic.Text
          ? [{ Text: topic.Text, FirstURL: topic.FirstURL }]
          : [],
      );

      return {
        query,
        abstract: data.AbstractText || "",
        abstractUrl: data.AbstractURL || "",
        results: topics
          .filter(topic => topic.Text && topic.FirstURL)
          .slice(0, 10)
          .map(topic => ({
            title: topic.Text!.split(" - ")[0],
            url: topic.FirstURL!,
            snippet: topic.Text!,
          })),
        source: "duckduckgo" as const,
      };
    });

    if (typeof result === "string") return {
      query,
      abstract: result,
      abstractUrl: "",
      results: [],
      source: "duckduckgo",
    };

    if ("code" in result) return {
      query,
      abstract: `Busca indisponível: ${result.message}`,
      abstractUrl: "",
      results: [],
      source: "duckduckgo",
    };

    return result;
  }
}

export const duckSearchProvider = new DuckSearchProvider();
