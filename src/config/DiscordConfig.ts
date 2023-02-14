
export interface IDiscordJSConfig {
  TOKEN: string
}

const DiscordJSConfig: IDiscordJSConfig = {
  TOKEN: process.env.DISCORD_TOKEN as string
}
export default DiscordJSConfig
