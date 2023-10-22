export interface IDiscordJSConfig {
  TOKEN: string
  CLIENT_ID: string
  GUILD_ID: string
}

const DiscordJSConfig: IDiscordJSConfig = {
  CLIENT_ID: process.env.CLIENT_ID as string,
  GUILD_ID: process.env.GUILD_ID as string,
  TOKEN: process.env.DISCORD_TOKEN as string
}
export default DiscordJSConfig
