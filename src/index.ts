import DiscordConfig from './config/DiscordConfig'
import DiscordClient from './discord/DiscordJSClient'

const bot = new DiscordClient(DiscordConfig)

void bot.refreshCommands()

void bot.startEventListener()

void bot.startButtonsEventListener()
