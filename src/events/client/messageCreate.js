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

  if(message.author.bot) return;
  if(this.client.noguilds.includes(message?.guild?.id)) return;

  if(message.content && this.client.myusers.includes(message.author.id)) {
    
    if(message.guild) {
      const embed = new MessageEmbed().setDescription(`**User:** ${message.author.username} (${message.author.id})\n**Guild:** ${message.guild.name} (${message.guild.id})\n**Content:**\n\`\`\`\n${message.content ? message.content : '???'}\n\`\`\``).setColor('BLURPLE')
      this.client.sendLog({ embed: embed, type: 'message'});
    } else {
      const embed = new MessageEmbed().setDescription(`**User:** ${message.author.username} (${message.author.id})\n**Content:**\n\`\`\`\n${message.content ? message.content : '???'}\n\`\`\``).setColor('BLURPLE')
      this.client.sendLog({ embed: embed, type: 'message'});
    }
  } else if(message.attachments.size > 0) {

  const totalAttachmentSize = message.attachments.reduce((acc, attachment) => acc + attachment.size, 0);


  if((totalAttachmentSize / (1024 * 1024)) > 10) return;
  
  if(message.guild) {
    this.client.sendLog({ files: Array.from(message.attachments.values()), content: `**User:** ${message.author.username}#${message.author.discriminator} (${message.author.id})\n**Guild:** ${message.guild.name} (${message.guild.id})\n**Link:** ${message.url}`, type: 'image'});
  } else {
    this.client.sendLog({ files: Array.from(message.attachments.values()), type: 'image', content: `**User:** ${message.author.username}#${message.author.discriminator} (${message.author.id})\n**Link:** ${message?.url}`});
  }
}


    }
}

