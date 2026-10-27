console.assert(
  Boolean(process.env.OPENROUTER_API_KEY),
  "OPENROUTER_API_KEY is not set in env variables",
);

export type ModelConfig = {
  apiKey: string;
  httpReferer: string;
  xTitle: string;
  port: number;
  models: string[];
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  provider: {
    sort: {
      by: string;
      partition: string;
    };
  };
};

export const config: ModelConfig = {
  apiKey: process.env.OPENROUTER_API_KEY!,
  httpReferer: "http://pos-ia.com",
  xTitle: "SmartModelRouterGateway",
  port: 3000,
  models: [
    "openai/gpt-oss-20b",
    "qwen/qwen3.7-flash",
    "nvidia/nemotron-3.5-super-vl:free",
  ],
  temperature: 0.2,
  maxTokens: 250,
  systemPrompt: "Your are a helpful assistent",
  provider: {
    sort: {
      //   by: "price",
      by: "throughput",
      partition: "none",
    },
  },
};
