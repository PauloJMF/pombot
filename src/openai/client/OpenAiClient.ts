import { type IOpenAiConfig } from '../../config/OpenAIConfig'
import OpenAI from "openai";

export default class OpenAiClient {
  private readonly client: OpenAI

  constructor(private readonly config: IOpenAiConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey
    })
  }

  getInstance(): OpenAI {
    return this.client
  }
}
