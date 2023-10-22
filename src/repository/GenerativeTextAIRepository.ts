export interface GenerateCompletionResponse {
  response: string
  model: string
}

export default interface GenerativeTextAIRepository {
  generateCompletion: (question: string) => Promise<GenerateCompletionResponse>
}
