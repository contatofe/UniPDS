process.loadEnvFile(".env");

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_SITE_URL = "http://localhost:3000";
const OPENROUTER_SITE_NAME = "request-test";
const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
    "HTTP-Referer": OPENROUTER_SITE_URL,
    "X-Title": OPENROUTER_SITE_NAME,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: "como se constrói uma casa?",
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
