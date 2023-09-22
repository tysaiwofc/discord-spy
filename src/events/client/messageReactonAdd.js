import Command from "../../structures/Event.js";
import { WebhookClient, MessageEmbed } from 'discord.js-selfbot-v13';


export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'messageReactionAdd',
        })
    }

    run = async (reaction, user) => {
        if(!this.client.myusers.includes(user.id)) return;
        const embed = new MessageEmbed().setDescription(`**User:** ${user.username} (${user.id})\n**Emoji:** ${reaction.emoji.toString()}\n**Mensagem:** ${reaction.message.url}`).setColor('GREEN').setTimestamp().setTitle('Add Emoji')

        this.client.sendLog({ embed: embed, type: 'reaction'});


    }
}