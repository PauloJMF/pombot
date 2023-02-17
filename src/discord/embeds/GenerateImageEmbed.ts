import { EmbedBuilder } from 'discord.js'

export class GenerateImageEmbed extends EmbedBuilder {
  constructor () {
    super()
    this.setColor('#0099ff')
    this.setTimestamp()
  }

  usingInput (input: string): GenerateImageEmbed {
    return this.setTitle(`DALLE: ${input}`)
  }

  usingImage (url: string): GenerateImageEmbed {
    return this.setImage(url)
  }
}
