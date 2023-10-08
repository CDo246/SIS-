import { ChatCompletionMessageParam } from "openai/resources/chat";
import { openaiKey } from "../env";
import { publicProcedure, router } from "./trpc";
import OpenAI from "openai";
import { z } from "zod";

const sideSchema = z.union([z.literal("for"), z.literal("against")]);

type Side = z.infer<typeof sideSchema>;

const argumentParamsSchema = z.object({
  startingSide: sideSchema,
  topic: z.string(),
  messageCount: z.number(),
  role1: z.string(),
  role2: z.string(),
});

type ArgumentParams = z.infer<typeof argumentParamsSchema>;

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
  generateDebate: publicProcedure
    .input(argumentParamsSchema)
    .mutation(async ({ input }) => {
      const messages: DebateMessage[] = [];
      for (let i = 0; i < input.messageCount * 2; i++) {
        const nextMessage = await generateNextMessage(input, messages);
        messages.push(nextMessage);
        console.log(nextMessage.side);
        console.log("thinking:", nextMessage.thinking);
        console.log("---------------");
        console.log(nextMessage.message);
        console.log();
      }
      return messages;
    }),
  randTopic: publicProcedure.query(() => {
    return randomTopic();
  }),
  roles: publicProcedure.query(() => {
    return roles;
  }),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const openai = new OpenAI({
  apiKey: openaiKey,
});

type DebateMessage = {
  side: Side;
  thinking: string;
  message: string;
};

type SysMessageParams = {
  currentRole: string;
  otherRole: string;
  messageCount: number;
  topic: string;
  side: Side;
};

function flipSide(side: Side): Side {
  return side == "for" ? "against" : "for";
}

function buildSysMessage(params: SysMessageParams) {
  return `
You are an experienced debater debating a topic.
The debate consists of ${params.messageCount} messages per debater.
The debate should wrap up before the message count, but the final verdict will be decided by a judge.
The topic is: ${params.topic}.

Your role in the debate is ${params.currentRole}, and you are arguing ${
    params.side
  } the topic.
The opposing debater's role is ${
    params.otherRole
  }, and they are arguing ${flipSide(params.side)} the topic.
The debate should be entertaining and understandable to read.

Your message must be well thought through, so first start by detailing your thoughts (which will be private), then type a markdown seperator (aka \`---\`), then all the text following will be your public argument
Your thoughts may be as long as you want, however your argument must be no more than 2 sentences long.
You should always make an attempt to address previous arguments whilst also bringing up new ones.

You MUST have a thinking section, then a separator (---), then your public argument.
You MUST adhere to your debate role in every message
`;
}

async function generateNextMessage(
  params: ArgumentParams,
  messages: DebateMessage[],
): Promise<DebateMessage> {
  const isInitialSide = messages.length % 2 == 0;

  const side = isInitialSide
    ? params.startingSide
    : flipSide(params.startingSide);

  const sysMessage = buildSysMessage({
    side: side,
    topic: params.topic,
    messageCount: params.messageCount,
    currentRole: isInitialSide ? params.role1 : params.role2,
    otherRole: isInitialSide ? params.role2 : params.role1,
  });

  const aiMessages = messages.map<ChatCompletionMessageParam>((message, i) => {
    const isInitialSide = i % 2 == 0;
    const messageSide = isInitialSide
      ? params.startingSide
      : flipSide(params.startingSide);
    return {
      role: messageSide == side ? "assistant" : "user",
      content: `${message.thinking}\n\n---\n\n${message.message}`,
    };
  });

  const openAIResponse = await openai.chat.completions.create({
    messages: [{ role: "system", content: sysMessage }, ...aiMessages],
    model: "gpt-4",
  });
  const responseText = openAIResponse.choices[0].message.content;

  let message = "";
  let thinking = "";
  let parts = responseText!.split("---").map((t) => t.trim());
  if (parts.length == 1) {
    message = parts[0];
  } else {
    thinking = parts[0];
    message = parts[1];
  }

  return { message: message, side: side, thinking: thinking };
}

let roles: Array<string> = [
  "Philosopher",
  "Angry Drunk",
  "Conspiracy Theorist",
  "Cowboy",
  "Pirate",
  "Valley Girl",
  "Shakespearean Bard",
  "Hyperactive Dog That Can Talk",
  "Mime",
  "Professional Rapper That Rhymes Everything",
  "Caveman",
  //Character From Media (that we may or may not be allowed to use)
  "Super Mario",
  "Yoda",
];

function randomRole() {
  return roles[Math.floor(Math.random() * roles.length)];
}

let topics: Array<string> = [
  "Dogs are better pets than cats.",
  "Summer is better than winter.",
  "Pepperoni is the best pizza topping.",
  "Clowns are more scary than funny.",
  "Modern music is better than classical music.",
  "It would be better to be able to fly than to be able to turn invisible.",
  "Pluto should still be considered a planet.",
  "We should allow people to go barefoot anywhere if they want to.",
  "Fiction is better than non-fiction.",
  "People should not have to go to school or work on their birthdays.",
  "Should time travel be allowed?",
  "Is a hot dog a sandwich?",
  "Do aliens exist?",
  "Is it ethical to use animals for scientific research?",
  "Are video games a form of art?",
  "Are humans inherently good or evil?",
  "Is it ethical to use animals for scientific research?",
  "Is money the root of all evil?",
  "Should all drugs be decriminalized?",
  "Is there such a thing as fate or destiny?",
  "Should schools have mandatory physical education?",
  "Is it better to have a pet dragon or a pet unicorn?",
];

function randomTopic() {
  return topics[Math.floor(Math.random() * topics.length)];
}

// async function main() {
//   console.log("starting debate, please wait...");
//   const params: ArgumentParams = {
//     role1: randomRole(),
//     role2: randomRole(),
//     messageCount: 2,
//     topic: randomTopic(),
//     startingSide: "for",
//   };

//   console.log("TOPIC: " + params.topic);
//   console.log(params.role1 + " VS. " + params.role2 + "\n");

//   const messages: DebateMessage[] = [];
//   for (let i = 0; i < params.messageCount * 2; i++) {
//     const nextMessage = await generateNextMessage(params, messages);
//     messages.push(nextMessage);
//     console.log(nextMessage.side);
//     console.log("thinking:", nextMessage.thinking);
//     console.log("---------------");
//     console.log(nextMessage.message);
//     console.log();
//   }
// }

// main();