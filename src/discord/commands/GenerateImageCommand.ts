import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  type CommandInteraction,
  SlashCommandBuilder
} from 'discord.js'
import container from '../../application/container'
import { SingleImageEmbed } from '../embeds/SingleImageEmbed'
import { type GenerativeImageAIRepository } from '../../repository/GenerativeTextAIRepository'

const dalleRepository: GenerativeImageAIRepository = container.openai.dalleRepository
const commandName = 'generateimage'
module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription('Ask DALLE for an image!')
    .addStringOption((option) =>
      option.setName('prompt')
        .setDescription('This is the prompt that will be sent to OpenAI DALLE')
        .setRequired(true)
    ).addIntegerOption((option) =>
      option.setName('n')
        .setDescription('The number of images to generate')
        .setRequired(false)
    ).addStringOption((option) =>
      option.setName('size')
        .setDescription('The size of the output image')
        .setRequired(false)
        .addChoices(
          { name: 'small', value: 'small' },
          { name: 'medium', value: 'medium' },
          { name: 'large', value: 'large' }
        )
    ),
  async execute (interaction: CommandInteraction) {
    const input = String(interaction.options.get('prompt')?.value)
    await interaction.deferReply()
    const response = await dalleRepository.generateImage(input)
    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`${commandName}:retry`)
          .setLabel('Retry')
          .setStyle(1)
      )
    const embed = new SingleImageEmbed()
      .usingInput(input, response.model)
      .usingImage(response.imageURL)

    await interaction.editReply({ content: input, embeds: [embed], components: [buttonRow] })
  },
  async retry (buttonInteraction: ButtonInteraction) {
    await buttonInteraction.deferUpdate()
    const response = await dalleRepository.generateImage(buttonInteraction.message.content)
    const embed = new SingleImageEmbed()
      .usingInput(buttonInteraction.message.content, response.model)
      .usingImage(response.imageURL)
    await buttonInteraction.editReply({ embeds: [embed] })
  }
}
