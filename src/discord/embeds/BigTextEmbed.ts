import {EmbedBuilder} from 'discord.js'

export class BigTextEmbed extends EmbedBuilder {
  constructor() {
    super()
    this.setColor('#0099ff')
    this.setTimestamp()
  }

  usingInput(input: string): BigTextEmbed {
    return this.setTitle(`ChatGPT3: ${input}`)
  }

  usingDescription(description: string): BigTextEmbed {
    return this.setDescription(description)
  }

  usingModel(model: string): BigTextEmbed {
    return this.setFooter({text: `Generated by model: ${model}`})
  }
}
