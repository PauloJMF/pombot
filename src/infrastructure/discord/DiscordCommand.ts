import { type CommandInteraction, type SlashCommandBuilder } from 'discord.js'

export default interface DiscordCommand {
  commandBuilder: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => Promise<void>
}
