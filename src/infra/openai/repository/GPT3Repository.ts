import type GenerativeAIRepository from '../../../domain/textToText/repository/GenerativeAIRepository'

export class GPT3Repository implements GenerativeAIRepository {
  async generateResponse (question: string): Promise<string> {
    return 'Not implemented'
  }
}
