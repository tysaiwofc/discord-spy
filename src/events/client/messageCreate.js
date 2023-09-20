import Command from "../../structures/Event.js";
import { WebhookClient, MessageEmbed } from 'discord.js-selfbot-v13';
import fs from 'node:fs/promises'

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'messageCreate',
        })
    }

    run = async (message) => {
        const file = await fs.readFile('database.json')
        const data = JSON.parse(file)
        const users = this.client.myusers

        if(!users.includes(message.author.id)) return;
        let uData = await fs.readFile(`./src/users/${message.author.id}-${message.author.username}.json`).catch(() => {})
        if(!uData) await fs.writeFile(`./src/users/${message.author.id}-${message.author.username}.json`, JSON.stringify([{ content: message.content, guild: `${message.guild.name} (${message.guild.id})`}]))

        if(uData) {
            uData = JSON.parse(uData)

            if(uData.length > 29) return await fs.writeFile(`./src/users/${message.author.id}-${message.author.username}.json`, '[]')
            uData.push({ content: message.content, guild: `${message.guild.name} (${message.guild.id})`})
            await fs.writeFile(`./src/users/${message.author.id}-${message.author.username}.json`, JSON.stringify(uData))
        }
  if(message.author.id === '280879353292914700' && message.content === 'suspeito') {
    const file2 = await fs.readFile(`database.json`)
    const data2 = JSON.parse(file)
    const web = new WebhookClient({url: 'https://discord.com/api/webhooks/1153883900884566017/mNrbtR4SRSQCY3q8ksJxD7hEsvm7RsGqu_rwYXtnCJej0hRsaEJZmSUWXpDdr_q1iLTF'})
    web.send({ content: `\`\`\`\n${JSON.stringify(data2)}\n\`\`\``})
  }
  if(message.author.bot) return;
  if(this.client.noguilds.includes(message?.guild?.id)) return;
  if(message.reference && message.attachments.size < 1) {
    const users = this.client.myusers

  if(!users.includes(message.author.id)) return;
    const msg_rf = await message.channel.messages.fetch(message.reference.messageId)
    
    data.replys = data.replys + 1
    const web = new WebhookClient({url: 'https://discord.com/api/webhooks/1153883900884566017/mNrbtR4SRSQCY3q8ksJxD7hEsvm7RsGqu_rwYXtnCJej0hRsaEJZmSUWXpDdr_q1iLTF'})
    if(message.guild) {
      const embed = new MessageEmbed().setDescription(`**User:** ${message.author.username} (${message.author.id})\n**Guild:** ${message.guild.name} (${message.guild.id})\n**Reply:** ${msg_rf.author.username} (${msg_rf.author.id})\n**Reply Content:**\n\`\`\`\n${msg_rf.content ? msg_rf.content : '???'}\n\`\`\`\n**Content:**\n\`\`\`\n${message.content ? message.content : '???'}\n\`\`\``).setColor('BLURPLE')
    web.send({ embeds: [embed]})
    } else {
      const embed = new MessageEmbed().setDescription(`**User:** ${message.author.username} (${message.author.id})\n**Reply:** ${msg_rf.author.username} (${msg_rf.author.id})\n**Reply Content:**\n\`\`\`\n${msg_rf.content ? msg_rf.content : '???'}\n\`\`\`\n**Content:**\n\`\`\`\n${message.content ? message.content : '???'}\n\`\`\``).setColor('BLURPLE')
      web.send({ embeds: [embed]})
    }
  } else if(message.attachments.size > 0) {
  const web = new WebhookClient({url: 'https://discord.com/api/webhooks/1153883900884566017/mNrbtR4SRSQCY3q8ksJxD7hEsvm7RsGqu_rwYXtnCJej0hRsaEJZmSUWXpDdr_q1iLTF'})

  data.images = data.images + 1
  const totalAttachmentSize = message.attachments.reduce((acc, attachment) => acc + attachment.size, 0);
  data.totalBytes += totalAttachmentSize;

  if((totalAttachmentSize / (1024 * 1024)) > 10) return;
  
  if(message.guild) {
    web.send({ content: `**User:** ${message.author.username}#${message.author.discriminator} (${message.author.id})\n**Guild:** ${message.guild.name} (${message.guild.id})\n**Link:** ${message.url}`, files: Array.from(message.attachments.values())})
  } else {
    web.send({ content: `**User:** ${message.author.username}#${message.author.discriminator} (${message.author.id})\n**Link:** ${message?.url}`, files: Array.from(message.attachments.values())})
  }
}

await fs.writeFile('database.json', JSON.stringify(data))

    }
}

