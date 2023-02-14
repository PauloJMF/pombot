import type GenerativeAIRepository from '../repository/GenerativeAIRepository'

export default class AskGenerativeAiUseCase {
  constructor (
    private readonly generativeAiRepository: GenerativeAIRepository
  ) {
  }

  public async execute (question: string): Promise<string> {
    return await this.generativeAiRepository.generateResponse(question)
  }
}
