import { type CommandInteraction, type SlashCommandBuilder } from 'discord.js'

export default abstract class DiscordCommand {
  public commandBuilder!: SlashCommandBuilder
  abstract execute (interaction: CommandInteraction): Promise<void>
}
