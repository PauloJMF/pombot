import type OpenAiClient from '../client/OpenAiClient'
import type GenerativeTextAIRepository from '../../repository/GenerativeTextAIRepository'
import type {
    GenerateCompletionResponse
} from '../../repository/GenerativeTextAIRepository'
import OpenAI from "openai";
import Completion = OpenAI.Completion;

export class GPT3Repository implements GenerativeTextAIRepository {
  constructor(private readonly openAiClient: OpenAiClient) {
  }

  async generateCompletion(question: string): Promise<GenerateCompletionResponse> {
    const completion = {
      model: 'text-davinci-003',
      prompt: question,
      max_tokens: 1000,
      temperature: 0.2,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: '{}'
    }
    const response = await this.openAiClient.getInstance().completions.create(completion) as Completion
    return {
      model: completion.model,
      response: response.choices[0].text ?? ''
    }
  }
}
