import Command from "../../structures/Event.js";
import { MessageEmbed } from "discord.js-selfbot-v13";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'voiceStateUpdate',
        })
    }

    run = async (oldState, newState) => {

      if(this.client.noguilds.includes(newState?.guild?.id)) return;
      const guild = newState.guild;
      const users = ["1125899671185916005", "1064819258112090152", "280879353292914700", "600405125860950016", "947848047696691200"]
    
      if(!users.includes(newState?.member?.user?.id)) return;
      if(!users.includes(oldState?.member?.user?.id)) return;
    
      // Verifica se a atualização ocorreu em um canal de voz
      if (oldState.channel || newState.channel) {
        const user = newState.member.user;
    
        
        // Verifica se o usuário entrou ou saiu de um canal de voz
        if (oldState.channel && !newState.channel) {
          const membersInChannel = oldState.channel.members;
          const members = membersInChannel.map(member => member.user.tag).slice(0, 15).join('\n')
          const embed = new MessageEmbed().setDescription(`**User:** ${user.username} (${user.id})\n**Guild:** ${guild.name} (${guild.id})\n**Call:** <#${oldState.channel.id}>\n**Device:** ${oldState.selfMute ? '❌' : '🎙️'}/${oldState.selfDeaf ? '❌' : '🔈'}`).setColor('RED').setTimestamp()
          this.client.sendLog({ embed: embed, content: `${members ? `\`\`\`\n${members}\n\`\`\`` : 'Sozinho'}`, type: 'voice'});

        } else if (!oldState.channel && newState.channel) {

          const membersInChannel = newState.channel.members;
          const members = membersInChannel.map(member => `${member.user.tag} (${member.user.id})`).slice(0, 15).join('\n')
          const embed = new MessageEmbed().setDescription(`**User:** ${user.username} (${user.id})\n**Guild:** ${guild.name} (${guild.id})\n**Call:** <#${newState.channel.id}>\n**Device:** ${newState.selfMute ? '❌' : '🎙️'}/${newState.selfDeaf ? '❌' : '🔈'}`).setColor('GREEN').setTimestamp()
          this.client.sendLog({ embed: embed, content: `${members ? `\`\`\`\n${members}\n\`\`\`` : 'Sozinho'}`, type: 'voice'});

        } else if (oldState.channel && newState.channel) {
       
          const membersInChannel = newState.channel.members;
          const members = membersInChannel.map(member => `${member.user.tag} (${member.user.id})`).slice(0, 15).join('\n')
          const embed = new MessageEmbed().setDescription(`**User:** ${user.username} (${user.id})\n**Guild:** ${guild.name} (${guild.id})\n**Call:** <#${newState.channel.id}>\n**Device:** ${newState.selfMute ? '❌' : '🎙️'}/${newState.selfDeaf ? '❌' : '🔈'}`).setColor('YELLOW').setTimestamp()
          this.client.sendLog({ embed: embed, content: `${members ? `\`\`\`\n${members}\n\`\`\`` : 'Sozinho'}`, type: 'voice'});

        }
      }
    
     
    
    }
}

