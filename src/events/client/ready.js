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
        setInterval(async () => {
            const file = await fs.readFileSync('database.json')
            const data = JSON.parse(file)
            const elapsedTime = (Date.now() - data.startTime) / 1000; // Tempo decorrido em segundos
            const averageDataUsage = data.totalBytes / (1024 * 1024) / elapsedTime; // Uso médio de dados em MB por segundo
          
            console.log(`Uso médio de dados: ${averageDataUsage.toFixed(2)} MB/segundo`);
          
            // Reinicialize os dados para a próxima medição
            data.totalBytes = 0;
            data.startTime = Date.now();
            await fs.writeFileSync('database.json', JSON.stringify(data))
          }, 5 * 60000);
    }
}