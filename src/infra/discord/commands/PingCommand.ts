import { SlashCommandBuilder } from 'discord.js'

// TODO: use ioc to create commands using DiscordCommand abstract class
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute (interaction: any) {
    await interaction.reply('Pong !')
  }
}
