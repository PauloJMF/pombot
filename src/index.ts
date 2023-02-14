import DiscordConfig from './config/DiscordConfig'
import DiscordClient from './infra/discord/DiscordJSClient'

const bot = new DiscordClient(DiscordConfig)
void bot.refreshCommands()
void bot.startEventListener()
