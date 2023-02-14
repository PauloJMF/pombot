import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import AskGenerativeAiUseCase from '../../../domain/textToText/useCase/AskGenerativeAiUseCase'
import { GPT3Repository } from '../../openai/repository/GPT3Repository'
import OpenAiClient from '../../openai/client/OpenAiClient'
import openAIConfig from '../../../config/OpenAIConfig'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('askgpt')
    .setDescription('Ask ChatGPT!')
    .addStringOption((option) =>
      option.setName('question')
        .setDescription('This is the command that will be sent to OpenAI ChatGPT3')
        .setRequired(true)
    ),
  async execute (interaction: CommandInteraction) {
    const openAiClient = new OpenAiClient(openAIConfig)
    const gtpRepository = new GPT3Repository(openAiClient)
    const useCase = new AskGenerativeAiUseCase(gtpRepository)
    const input = String(interaction.options.get('question')?.value)
    await interaction.deferReply({ ephemeral: true })
    const response = await useCase.execute(input)
    await interaction.editReply(response)
  }
}
