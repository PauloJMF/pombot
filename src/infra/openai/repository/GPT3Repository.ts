import type GenerativeAIRepository from '../../../domain/textToText/repository/GenerativeAIRepository'
import type OpenAiClient from '../client/OpenAiClient'

export class GPT3Repository implements GenerativeAIRepository {
  constructor (private readonly openAiClient: OpenAiClient) {
  }

  async generateResponse (question: string): Promise<string> {
    const response = await this.openAiClient.getInstance().createCompletion(
      {
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
    )
    return response.data.choices[0].text ?? 'Failed'
  }
}
