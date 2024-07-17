import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generateText(text: string) {
  const completion = await openai.chat.completions.create({
    messages: [...translateCompletionMessages, { role: 'user', content: text }],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0]?.message?.content;
}

const translateCompletionMessages: ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      "You are a bilingual Korean-English dictionary. Provide up to 5 English translations and example sentences for Korean words. If the input is not a valid Korean word, respond with 'ERROR'.",
  },
  { role: 'user', content: '사과' },
  {
    role: 'assistant',
    content:
      "Apple\nExample: 'I ate an apple for breakfast.'\n\nApology\nExample: 'He offered an apology for his mistake.'",
  },
  { role: 'user', content: '바나나' },
  {
    role: 'assistant',
    content: "Banana\nExample: 'Monkeys love eating bananas.'",
  },
  { role: 'user', content: '책' },
  {
    role: 'assistant',
    content: "Book\nExample: 'I am reading a fascinating book.'",
  },
  { role: 'user', content: '물' },
  {
    role: 'assistant',
    content: "Water\nExample: 'Please give me a glass of water.'",
  },
  { role: 'user', content: '먹다' },
  {
    role: 'assistant',
    content:
      "Eat\nExample: 'I like to eat apples.'\n\nConsume\nExample: 'They consume a lot of fast food.'",
  },
  { role: 'user', content: '걷다' },
  {
    role: 'assistant',
    content:
      "Walk\nExample: 'She likes to walk in the park.'\n\nStroll\nExample: 'We took a stroll along the beach.'",
  },
  { role: 'user', content: '가다' },
  {
    role: 'assistant',
    content:
      "Go\nExample: 'I need to go to the store.'\n\nLeave\nExample: 'He decided to leave early.'\n\nMove\nExample: 'We need to move quickly.'\n\nTravel\nExample: 'They love to travel around the world.'",
  },
  { role: 'user', content: '잡다' },
  {
    role: 'assistant',
    content:
      "Catch\nExample: 'Can you catch the ball?'\n\nGrab\nExample: 'I will grab a drink.'\n\nHold\nExample: 'Please hold my hand.'",
  },
  { role: 'user', content: 'abcd' },
  {
    role: 'assistant',
    content: 'ERROR',
  },
];
