import { EmbedBuilder } from 'discord.js'

export class GenerateImageEmbed extends EmbedBuilder {
  constructor () {
    super()
    this.setColor('#0099ff')
    this.setTimestamp()
  }

  usingInput (input: string, model: string): GenerateImageEmbed {
    return this.setTitle(`${model}: ${input}`)
  }

  usingImage (url: string): GenerateImageEmbed {
    return this.setImage(url)
  }
}
