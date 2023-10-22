import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import type DiscordCommand from '../DiscordCommand'

export default class PingCommand implements DiscordCommand {
  public commandBuilder: SlashCommandBuilder

  constructor () {
    this.commandBuilder = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong')
  }

  async execute (interaction: CommandInteraction): Promise<void> {
    await interaction.reply({ content: 'Pong' })
  }
}
