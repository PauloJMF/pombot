import { type IOpenAiConfig } from '../../config/OpenAIConfig'
import { Configuration, OpenAIApi } from 'openai'

export default class OpenAiClient {
  private readonly client: OpenAIApi

  constructor(private readonly config: IOpenAiConfig) {
    const configuration = new Configuration({
      apiKey: config.apiKey
    })
    this.client = new OpenAIApi(configuration)
  }

  getInstance(): OpenAIApi {
    return this.client
  }
}
