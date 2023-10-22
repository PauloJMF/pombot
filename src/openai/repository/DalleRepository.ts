import { randomBytes } from 'crypto'
import { srcToFile } from '../../shared/srcToFile'
import type OpenAiClient from '../client/OpenAiClient'
import type GenerativeImageAIRepository from '../../repository/GenerativeImageAIRepository'
import { type GenerateImageResponse } from '../../repository/GenerativeImageAIRepository'

export default class DalleRepository implements GenerativeImageAIRepository {
  constructor(private readonly openAiClient: OpenAiClient) {
  }

  async generateImage(description: string): Promise<GenerateImageResponse> {
    const response = await this.openAiClient.getInstance().images.generate({
      prompt: description,
      n: 1,
      size: '256x256'
    })
    return {
      model: 'DALL·E',
      imageURL: response.data[0].url ?? ''
    }
  }

  async generateImageVariant(imageUrl: string): Promise<GenerateImageResponse> {
    const id = randomBytes(16).toString('hex')
    const imageFile = await srcToFile(imageUrl, `${id}.png`, 'image/png')
    const response = await this.openAiClient.getInstance().images.createVariation({
        image: imageFile,
      }
    )
    return {
      model: 'DALL·E',
      imageURL: response.data[0].url ?? ''
    }
  }

  async generateImageEdit(imageUrl: string, prompt: string): Promise<GenerateImageResponse> {
    const id = randomBytes(16).toString('hex')
    const imageFile = await srcToFile(imageUrl, `${id}.png`, 'image/png')
    const response = await this.openAiClient.getInstance().images.edit(
      {
        image: imageFile,
        prompt
      }
    )
    return {
      model: 'DALL·E',
      imageURL: response.data[0].url ?? ''
    }
  }
}
