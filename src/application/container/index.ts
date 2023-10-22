import { BigTextEmbed } from '../../discord/embeds/BigTextEmbed'
import { SingleImageEmbed } from '../../discord/embeds/SingleImageEmbed'


const container = {
  discord: {
    embeds: {
      askGPTEmbed: new BigTextEmbed(),
      generateImageEmbed: new SingleImageEmbed()
    }
  }
}

export default container
