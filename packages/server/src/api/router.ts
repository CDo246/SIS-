import { publicProcedure, router } from "./trpc";
import OpenAI from "openai";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const openai = new OpenAI({
  apiKey: "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", // AHMAD'S API KEY, PLEASE DO NOT OVERUSE!
});

//Testing if OpenAI's API worked, delete later
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Write a name for a superhero dog." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);
}

main();
