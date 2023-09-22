import Jujuba from './structures/Client.js'
import { config } from 'dotenv'
config()

const client = new Jujuba({checkUpdate: false})

client.login(process.env.TOKEN)

process.on('uncaughtException', err => {
    console.log(err)
})

process.on('multipleResolves', err => {
    console.log(err)
})

process.on('unhandledRejection', err => {
    console.log(err)
})