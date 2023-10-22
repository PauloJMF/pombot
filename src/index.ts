import container from './application/container'
import type DiscordClient from './infrastructure/discord/DiscordClient'

async function startBot (): Promise<void> {
  const discordClient: DiscordClient = container.resolve('discordClient')
  await discordClient.startEventListener()
}

void startBot().then(() => {
  console.log('Bot started')
})
