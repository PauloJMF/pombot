export interface GenerativeAIRepository {
  generateResponse: (question: string) => Promise<string>
}
