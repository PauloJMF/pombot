
export interface GenerateCompletionResponse {
  response: string
  model: string
}

export interface GenerateImageResponse {
  imageURL: string
  model: string
}
export default interface GenerativeAIRepository {
  generateCompletion: (question: string) => Promise<GenerateCompletionResponse>
  generateImage: (description: string) => Promise<GenerateImageResponse>
}
