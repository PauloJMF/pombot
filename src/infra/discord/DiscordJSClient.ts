import { Client, Events, IntentsBitField } from 'discord.js'
import { type IDiscordJSConfig } from '../../config/DiscordConfig'

export default class DiscordJSClient {
  private readonly instance: Client
  public constructor (private readonly config: IDiscordJSConfig) {
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

    this.instance = client
  }

  public getInstance (): Client {
    return this.instance
  }
}
