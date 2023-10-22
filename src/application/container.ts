import {
  createContainer,
  InjectionMode,
  asValue, Lifetime, asClass
} from 'awilix'
import path from 'path'
import Discord from '../config/DiscordConfig'

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

container.loadModules([
  'infrastructure/discord/**/!(*.mock|*.spec).(t|j)s'
],
{
  cwd: path.join(__dirname, '../'),
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass
  }
})

container.register('discordConfig', asValue(Discord))

export default container
