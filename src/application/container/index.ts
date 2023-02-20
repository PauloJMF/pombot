import { GPT3Repository } from '../../openai/repository/GPT3Repository'
import OpenAiClient from '../../openai/client/OpenAiClient'
import openAIConfig from '../../config/OpenAIConfig'
import { BigTextEmbed } from '../../discord/embeds/BigTextEmbed'
import { SingleImageEmbed } from '../../discord/embeds/SingleImageEmbed'
import DalleRepository from '../../openai/repository/DalleRepository'

const openAiClient = new OpenAiClient(openAIConfig)
const gptRepository = new GPT3Repository(openAiClient)
const dalleRepository = new DalleRepository(openAiClient)

const container = {
  openai: {
    gptRepository,
    dalleRepository
  },
  discord: {
    embeds: {
      askGPTEmbed: new BigTextEmbed(),
      generateImageEmbed: new SingleImageEmbed()
    }
  }
}

export default container
