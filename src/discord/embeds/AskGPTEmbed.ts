import { EmbedBuilder } from 'discord.js'

export class AskGPTEmbed extends EmbedBuilder {
  constructor () {
    super()
    this.setColor('#0099ff')
    this.setTimestamp()
  }

  usingInput (input: string): AskGPTEmbed {
    return this.setTitle(`ChatGPT3: ${input}`)
  }

  usingDescription (description: string): AskGPTEmbed {
    return this.setDescription(description)
  }

  usingModel (model: string): AskGPTEmbed {
    return this.setFooter({ text: `Generated by model: ${model}` })
  }
}