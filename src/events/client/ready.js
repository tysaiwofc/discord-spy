import Command from "../../structures/Event.js";
import fs from 'node:fs'


export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'ready',
        })
    }

    run = async () => {
        this.client.user.setStatus('online')
        this.client.user.setSamsungActivity('com.miHoYo.GenshinImpact', 'START');
    }
}