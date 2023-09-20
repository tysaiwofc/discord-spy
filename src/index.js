import Jujuba from './structures/Client.js'
import { config } from 'dotenv'
config()

const client = new Jujuba({checkUpdate: false})

client.login(process.env.TOKEN)

