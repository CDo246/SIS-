import { publicProcedure, router } from "./trpc";
import OpenAI from "openai";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;


const openai = new OpenAI({
  apiKey: '', // Put in your api key here
});

//Two AI streaming test
let debaterOneMessageOne:any;
let debaterTwoMessageOne:any;
let debaterOneMessageTwo:any;
let debaterTwoMessageTwo:any;
let debaterOneMessageThree:any;
let debaterTwoMessageThree:any;

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue for the debating topic. You are Debater 1, and your personality is extremely arrogant, snobbish, and condescending. Only provide one single argument in your response for now, and write no more than one paragraph of text for it.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' }
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterOneMessageOne = completion.choices[0].message.content;

  console.log("Debater 1, Argument 1: " + debaterOneMessageOne + '\n');
}

async function main2() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue against the debating topic. You are Debater 2, and your personality is extremely angry, disgruntled, and crude. Only provide one single argument in your response for now, and write no more than one paragraph of text for it. Include a rebuttal to the argument made by the Debater 1 if possible, and fit it into your one paragraph.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' },
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageOne}
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterTwoMessageOne = completion.choices[0].message.content;

  console.log("Debater 2, Argument 1: " + debaterTwoMessageOne + "\n");
}

async function main3() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue for the debating topic. You are Debater 1, and your personality is extremely arrogant, snobbish, and condescending. Only provide one single argument that is different from your previous argument in your response for now, and write no more than one paragraph of text for it. Include a rebuttal to the argument made by the Debater 2 if possible, and fit it into your one paragraph.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' },
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageOne},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageOne}
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterOneMessageTwo = completion.choices[0].message.content;

  console.log("Debater 1, Argument 2: " + debaterOneMessageTwo + "\n");
}

async function main4() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue against the debating topic. You are Debater 2, and your personality is extremely angry, disgruntled, and crude. Only provide one single argument that is different from your previous argument in your response for now, and write no more than one paragraph of text for it. Include a rebuttal to the argument made by the Debater 1 if possible, and fit it into your one paragraph.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' },
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageOne},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageOne},
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageTwo}
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterTwoMessageTwo = completion.choices[0].message.content;

  console.log("Debater 2, Argument 2: " + debaterTwoMessageTwo + "\n");
}

async function main5() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue for the debating topic. You are Debater 1, and your personality is extremely arrogant, snobbish, and condescending. Only provide one single argument that is different from your previous argument in your response for now, and write no more than one paragraph of text for it. Include a rebuttal to the argument made by the Debater 2 if possible, and fit it into your one paragraph. Write a concluding statement to wrap up your debate.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' },
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageOne},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageOne},
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageTwo},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageTwo}
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterOneMessageThree = completion.choices[0].message.content;

  console.log("Debater 1, Argument 3: " + debaterOneMessageThree + "\n");
}

async function main6() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Based on the debating topic provided by the user, you will roleplay as a professional debater. You will argue against the debating topic. You are Debater 2, and your personality is extremely angry, disgruntled, and crude. Only provide one single argument that is different from your previous argument in your response for now, and write no more than one paragraph of text for it. Include a rebuttal to the argument made by the Debater 1 if possible, and fit it into your one paragraph. Write a concluding statement to wrap up your debate.'},
      { role: 'system', content: 'Debating Topic: The development of artificial intelligence will help humanity.' },
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageOne},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageOne},
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageTwo},
      { role: 'assistant', content: 'Debater 2: ' +  debaterTwoMessageTwo},
      { role: 'user', content: 'Debater 1: ' +  debaterOneMessageThree},
    ],
    model: 'gpt-3.5-turbo-0301',
    temperature: 0.9,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
    max_tokens: 200,
  });

  debaterTwoMessageThree = completion.choices[0].message.content;

  console.log("Debater 2, Argument 3: " + debaterTwoMessageThree + "\n");
}

main();
main2();
main3();
main4();
main5();
main6();
