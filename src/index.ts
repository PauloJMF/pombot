import DiscordConfig from './config/DiscordConfig'
import DiscordClient from './infrastructure/discord/DiscordJSClient'

const bot = new DiscordClient(DiscordConfig)

void bot.startEventListener()
