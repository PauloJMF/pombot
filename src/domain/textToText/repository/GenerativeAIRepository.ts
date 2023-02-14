export default interface GenerativeAIRepository {
  generateResponse: (question: string) => Promise<string>
}
