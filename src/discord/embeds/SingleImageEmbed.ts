import { EmbedBuilder } from 'discord.js'

export class SingleImageEmbed extends EmbedBuilder {
  constructor () {
    super()
    this.setColor('#0099ff')
    this.setTimestamp()
  }

  usingInput (input: string, model: string): SingleImageEmbed {
    return this.setTitle(`${model}: ${input}`)
  }

  usingImage (url: string): SingleImageEmbed {
    return this.setImage(url)
  }
}
