import {Client, Collection, type CommandInteraction, Events, IntentsBitField, REST, Routes} from 'discord.js'
import {type IDiscordJSConfig} from '../config/DiscordConfig'
import path from 'path'
import * as fs from 'fs'

export default class DiscordJSClient {
  private readonly instance: Client
  private readonly commands: Collection<string, any>
  private readonly commandsJSON: CommandInteraction[]

  public constructor(private readonly config: IDiscordJSConfig) {
    this.instance = this.createClient()
    this.commands = new Collection()
    this.commandsJSON = []
    this.setCommands()
  }

  public getInstance(): Client {
    return this.instance
  }

  private createClient(): Client {
    const client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages
      ]
    })

    client.once(Events.ClientReady, (event) => {
      console.log(`BOT STARTED, ${event.user.tag}`)
    })
    void client.login(this.config.TOKEN)
    return client
  }

  private setCommands(): void {
    const commandsPath = path.join(__dirname, 'commands')
    const commandFiles = fs.readdirSync(commandsPath)
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command = require(filePath)
      if ('data' in command && 'execute' in command) {
        this.commands.set(command.data.name, command)
        this.commandsJSON.push(command.data.toJSON())
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
      }
    }
  }

  public async refreshCommands(): Promise<void> {
    try {
      const rest = new REST({version: '10'}).setToken(this.config.TOKEN)
      await rest.put(
        Routes.applicationGuildCommands(this.config.CLIENT_ID, this.config.GUILD_ID),
        {body: this.commandsJSON}
      )
    } catch (error) {
      console.error(error)
    }
  }

  public async startEventListener(): Promise<void> {
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
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true})
      }
    })
  }

  public async startButtonsEventListener(): Promise<void> {
    this.getInstance().on(Events.InteractionCreate, async interaction => {
      if (!interaction.isButton()) return
      const [commandName, action] = interaction.customId.split(':')
      const command = this.commands.get(commandName)

      if (command === undefined) {
        console.error(`No command matching ${commandName} was found.`)
        return
      }

      try {
        await command[action](interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true})
      }
    })
  }
}
