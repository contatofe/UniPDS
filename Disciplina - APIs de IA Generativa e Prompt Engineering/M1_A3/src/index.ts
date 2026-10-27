import { OpenRouterService } from "./openrouterService.ts";
import { config } from "./config.ts";
import { createServer } from "./server.ts";

const routerService = new OpenRouterService(config);

const app = createServer(routerService);

await app.listen({ port: 3000, host: "0.0.0.0" });

app.log.info("server running at 3000");

// app
//   .inject({
//     method: "POST",
//     url: "/chat",
//     body: { question: "What is rate limiting?" },
//   })
//   .then((response) => {
//     console.log("Response Status", response.statusCode);
//     console.log("Response Body", response.body);
//   });
