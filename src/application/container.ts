import { BigTextEmbed } from '../infrastructure/discord/embeds/BigTextEmbed'
import { SingleImageEmbed } from '../infrastructure/discord/embeds/SingleImageEmbed'

const container = {
  discord: {
    embeds: {
      askGPTEmbed: new BigTextEmbed(),
      generateImageEmbed: new SingleImageEmbed()
    }
  }
}

export default container
