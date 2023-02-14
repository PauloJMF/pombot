import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import AskGenerativeAiUseCase from '../../../domain/textToText/useCase/AskGenerativeAiUseCase'
import { GPT3Repository } from '../../openai/repository/GPT3Repository'

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
    const gtpRepository = new GPT3Repository()
    const useCase = new AskGenerativeAiUseCase(gtpRepository)
    const input = String(interaction.options.get('question')?.value)
    const response = await useCase.execute(input)
    await interaction.reply(response)
  }
}
