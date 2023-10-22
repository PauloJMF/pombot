export interface GenerateImageResponse {
  imageURL: string
  model: string
}

export default interface GenerativeImageAIRepository {
  generateImage: (description: string) => Promise<GenerateImageResponse>
  generateImageVariant: (imageUrl: string) => Promise<GenerateImageResponse>
  generateImageEdit: (imageUrl: string, prompt: string) => Promise<GenerateImageResponse>
}

