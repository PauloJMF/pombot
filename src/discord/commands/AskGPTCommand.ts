import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import container from '../../application/container'

const chatGPTRepository = container.openai.gptRepository
const askGptEmbed = container.discord.embeds.askGPTEmbed

module.exports = {
  isDeferReply: true,
  data: new SlashCommandBuilder()
    .setName('askgpt')
    .setDescription('Ask ChatGPT!')
    .addStringOption((option) =>
      option.setName('question')
        .setDescription('This is the command that will be sent to OpenAI ChatGPT3')
        .setRequired(true)
    ),
  async execute (interaction: CommandInteraction) {
    const input = String(interaction.options.get('question')?.value)
    await interaction.deferReply()
    const response = await chatGPTRepository.generateCompletion(input)
    const embed = askGptEmbed
      .usingInput(input)
      .usingDescription(response.response)
      .usingModel(response.model)
    await interaction.editReply({ embeds: [embed] })
  }
}
