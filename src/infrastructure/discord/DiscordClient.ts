import { Client, Collection, type CommandInteraction, Events, IntentsBitField, REST, Routes } from 'discord.js'
import { type DiscordConfig } from '../../config/DiscordConfig'
import path from 'path'
import * as fs from 'fs'
import type DiscordCommand from './DiscordCommand'

export default class DiscordClient {
  private instance!: Client
  private readonly commands: Collection<string, any>
  private readonly commandsJSON: CommandInteraction[]

  public constructor (
    private readonly discordConfig: DiscordConfig
  ) {
    this.commands = new Collection()
    this.commandsJSON = []
  }

  public getInstance (): Client {
    return this.instance
  }

  private async createClient (): Promise<void> {
    const client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds
      ]
    })

    client.once(Events.ClientReady, (event) => {
      console.log(`BOT STARTED, ${event.user.tag}`)
    })

    await client.login(this.discordConfig.TOKEN)
    this.instance = client
  }

  private async setCommands (): Promise<void> {
    const commandsPath = path.join(__dirname, 'commands')
    const commandFiles = fs.readdirSync(commandsPath)
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      const ip = await import(filePath)
      // eslint-disable-next-line new-cap
      const command: DiscordCommand = new (ip.default)()
      this.commands.set(command.commandBuilder.name, command)
    }
  }

  public async refreshCommands (): Promise<void> {
    try {
      const rest = new REST({ version: '10' }).setToken(this.discordConfig.TOKEN)
      await rest.put(
        Routes.applicationGuildCommands(this.discordConfig.CLIENT_ID, this.discordConfig.GUILD_ID),
        { body: this.commandsJSON }
      )
    } catch (error) {
      console.error(error)
    }
  }

  public async startEventListener (): Promise<void> {
    await this.createClient()
    await this.setCommands()

    this.getInstance().on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return

      const command = this.commands.get(interaction.commandName)

      if (command === undefined) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
      }

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    })
  }
}
