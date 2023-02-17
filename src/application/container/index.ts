import { GPT3Repository } from '../../openai/repository/GPT3Repository'
import OpenAiClient from '../../openai/client/OpenAiClient'
import openAIConfig from '../../config/OpenAIConfig'
import { AskGPTEmbed } from '../../discord/embeds/AskGPTEmbed'
import { GenerateImageEmbed } from '../../discord/embeds/GenerateImageEmbed'

const openAiClient = new OpenAiClient(openAIConfig)
const gptRepository = new GPT3Repository(openAiClient)

const container = {
  openai: {
    gptRepository
  },
  discord: {
    embeds: {
      askGPTEmbed: new AskGPTEmbed(),
      generateImageEmbed: new GenerateImageEmbed()
    }
  }
}

export default container
