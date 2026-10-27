import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.ts";
import { config } from "../src/config.ts";
import {
  type LLMResponse,
  OpenRouterService,
} from "../src/openrouterService.ts";

console.assert(
  Boolean(process.env.OPENROUTER_API_KEY),
  "OPENROUTER_API_KEY is not set in env variables",
);

test("routes to cheapest models by default", async () => {
  const customConfig = {
    ...config,
    provider: {
      ...config.provider,
      sort: {
        ...config.provider.sort,
        by: "price",
      },
    },
  };
  const routerService = new OpenRouterService(customConfig);
  const app = createServer(routerService);

  const response = await app.inject({
    method: "POST",
    url: "/chat",
    body: { question: "What is rate limiting?" },
  });
  assert.equal(response.statusCode, 200);
  const body = response.json() as LLMResponse;

  assert.equal(body.model, "nvidia/nemotron-3.5-super-vl:free");
});

test("routes to the highest troughput model by default", async () => {
  const customConfig = {
    ...config,
    provider: {
      ...config.provider,
      sort: {
        ...config.provider.sort,
        by: "throughput",
      },
    },
  };
  const routerService = new OpenRouterService(customConfig);
  const app = createServer(routerService);

  const response = await app.inject({
    method: "POST",
    url: "/chat",
    body: { question: "What is rate limiting?" },
  });
  assert.equal(response.statusCode, 200);
  const body = response.json() as LLMResponse;

  assert.equal(body.model, "openai/gpt-oss-20b");
});
