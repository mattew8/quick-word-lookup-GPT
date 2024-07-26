import OpenAI from 'openai';
import {
  ChatCompletion,
  ChatCompletionMessageParam,
} from 'openai/resources/index.mjs';

export interface OpenAIClient {
  chatCompletionsCreate(params: {
    messages: ChatCompletionMessageParam[];
    model: string;
  }): Promise<ChatCompletion>;
}

// 실제 OpenAI 클라이언트 구현체
export class OpenAIClientImpl implements OpenAIClient {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async chatCompletionsCreate(params: {
    messages: ChatCompletionMessageParam[];
    model: string;
  }): Promise<ChatCompletion> {
    return this.openai.chat.completions.create(params);
  }
}
