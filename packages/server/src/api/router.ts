import { publicProcedure, router } from "./trpc";
import OpenAI from "openai";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;


const openai = new OpenAI({
  apiKey: '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', // AHMAD'S API KEY, PLEASE DO NOT OVERUSE!
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as two separate professional debaters: "Debater 1" and "Debater 2". Include which debater is talking before each message. Debater 1 will argue for the debating topic, and Debater 2 will argue against the debating topic. Debater 1\'s personality is extremely arrogant, snobbish, and condescending. Each debater will provide ONLY ONE argument per message, alternating paragraphs with one another. After 3 arguments from each debater, they will end the debate with a conclusion.'},
      { role: 'user', content: 'Debating Topic: The development of artificial intelligence will help humanity.' }
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 512,
  });

  // console.log(completion);
  // console.log(completion.choices);
  console.log(completion.choices[0].message.content);
}

main();
