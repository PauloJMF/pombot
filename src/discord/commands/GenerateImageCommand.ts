import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import container from '../../application/container'
import type GenerativeAIRepository from '../../repository/GenerativeAIRepository'
import { GenerateImageEmbed } from '../embeds/GenerateImageEmbed'

const chatGPTRepository: GenerativeAIRepository = container.openai.gptRepository

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generateimage')
    .setDescription('Ask DALLE for an image!')
    .addStringOption((option) =>
      option.setName('prompt')
        .setDescription('This is the prompt that will be sent to OpenAI DALLE')
        .setRequired(true)
    ),
  async execute (interaction: CommandInteraction) {
    const input = String(interaction.options.get('prompt')?.value)
    await interaction.deferReply()
    const response = await chatGPTRepository.generateImage(input)
    const embed = new GenerateImageEmbed()
      .usingInput(input, response.model)
      .usingImage(response.imageURL)
    await interaction.editReply({ embeds: [embed] })
  }
}
