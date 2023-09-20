import { Client } from "discord.js-selfbot-v13";
import { URL } from 'url';
import { readdirSync } from 'node:fs'
import { WebhookClient, MessageEmbed } from 'discord.js-selfbot-v13';
const __dirname = new URL('../../', import.meta.url).pathname;

export default class Jujuba extends Client {
    constructor(options) {
        super(options);
        this.myusers = ["1125899671185916005", "1064819258112090152", "280879353292914700", "600405125860950016", "947848047696691200"]
        this.noguilds = ["829022996915814451", "951504347378884648"]
        this.#loadEvents()
        this.sendLog = function sendLogMessage(user, guild, mode, state, members) {
            const web = new WebhookClient({url: 'https://discord.com/api/webhooks/1153883900884566017/mNrbtR4SRSQCY3q8ksJxD7hEsvm7RsGqu_rwYXtnCJej0hRsaEJZmSUWXpDdr_q1iLTF'})
            const embed = new MessageEmbed().setDescription(`**User:** ${user.username} (${user.id})\n**Guild:** ${guild.name} (${guild.id})\n**Type:** ${mode}\n**Call:** <#${state.channel.id}>`).setColor(mode === 'join' ? 'GREEN' : mode === 'exit' ? 'RED' : 'YELLOW').setTimestamp()
            web.send({ embeds: [embed], content: `${members ? `\`\`\`\n${members}\n\`\`\`` : 'Sozinho'}`})
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