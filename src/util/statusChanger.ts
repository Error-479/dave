import {Client} from 'discord.js';
import { ActivityTypes } from 'discord.js/typings/enums';

export function changeStatus(client: Client, status: ActivityTypes, text: string): void{
    if(status != ActivityTypes.CUSTOM) 
        client.user?.setActivity(text, { type: status });
    else
        client.user?.setActivity(text, { type: ActivityTypes.PLAYING });
    console.log('setActivity called');
}