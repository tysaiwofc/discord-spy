import { Client } from "discord.js-selfbot-v13";
import { URL } from 'url';
import { readdirSync } from 'node:fs'
import { WebhookClient, MessageEmbed } from 'discord.js-selfbot-v13';
import webhooks from "./Webhooks.js";
const __dirname = new URL('../../', import.meta.url).pathname;

export default class Jujuba extends Client {
    constructor(options) {
        super(options);
        this.myusers = JSON.parse(process.env.SPY_USERS)
        this.noguilds = JSON.parse(process.env.BLOCK_GUILDS)
        this.#loadEvents()
        this.sendLog = function sendLogMessage(options) {
            const web = new WebhookClient({url: webhooks[options.type]})
            const embed = options.embed
            web.send({ files: options.files ? options.files : [], embeds: embed ? [embed] : [], content: options.content ? options.content : ' '})
          }
    }
    async #loadEvents(path = 'src/events') {
        const categories = readdirSync(path)
        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)
            for (const command of commands) {
                const commandClass = await import(`${__dirname}/src/events/${category}/${command}`)
                const cmd = new (commandClass.default)(this)
                
                this.on(cmd.name, cmd.run)
            }
        }
        console.log('[ LOADER ] - Eventos foram carregados com sucesso!')
        
    }
}