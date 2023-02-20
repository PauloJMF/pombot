
export interface GenerateCompletionResponse {
  response: string
  model: string
}

export interface GenerateImageResponse {
  imageURL: string
  model: string
}
export interface GenerativeTextAIRepository {
  generateCompletion: (question: string) => Promise<GenerateCompletionResponse>
}

export interface GenerativeImageAIRepository {
  generateImage: (description: string) => Promise<GenerateImageResponse>
  generateImageVariant: (imageUrl: string) => Promise<GenerateImageResponse>
  generateImageEdit: (imageUrl: string, prompt: string) => Promise<GenerateImageResponse>
}
