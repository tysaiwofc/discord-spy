import Command from "../../structures/Event.js";
import fs from 'node:fs'

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'voiceStateUpdate',
        })
    }

    run = async (oldState, newState) => {
      const sendLogMessage = this.client.sendLog
      const file = await fs.readFileSync('database.json')
      const data = JSON.parse(file)
      if(this.client.noguilds.includes(newState?.guild?.id)) return;
      const guild = newState.guild;
      const users = ["1125899671185916005", "1064819258112090152", "280879353292914700", "600405125860950016", "947848047696691200"]
    
      if(!users.includes(newState.member.user.id)) return;
    
      // Verifica se a atualização ocorreu em um canal de voz
      if (oldState.channel || newState.channel) {
        const user = newState.member.user;
    
        
        // Verifica se o usuário entrou ou saiu de um canal de voz
        if (oldState.channel && !newState.channel) {
          const membersInChannel = oldState.channel.members;
          const members = membersInChannel.map(member => member.user.tag).slice(0, 15).join('\n')
          sendLogMessage(user, guild, 'exit', oldState, oldState.channel.members.size > 1 ? members: undefined);
          data.calls_exit = data.calls_exit + 1
        } else if (!oldState.channel && newState.channel) {
          data.calls_join = data.calls_join + 1
          const membersInChannel = newState.channel.members;
          const members = membersInChannel.map(member => `${member.user.tag} (${member.user.id})`).slice(0, 15).join('\n')
          sendLogMessage(user, guild, 'join', newState, newState.channel.members.size > 1 ? members : undefined);
        } else if (oldState.channel && newState.channel) {
          data.calls_join = data.calls_join + 1
          const membersInChannel = newState.channel.members;
          const members = membersInChannel.map(member => `${member.user.tag} (${member.user.id})`).slice(0, 15).join('\n')
          sendLogMessage(user, guild, 'change', newState, newState.channel.members.size > 1 ? members : undefined);
        }
      }
    
      await fs.writeFileSync('database.json', JSON.stringify(data))
    
    }
}

