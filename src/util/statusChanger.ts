import {Client} from 'discord.js';
import {ActivityTypes} from 'discord.js/typings/enums';

export function changeStatus(client: Client, status: ActivityTypes, text: string): void{
    //@ts-ignore
    //ts is borked on this? Works fine
    client.user?.setActivity(text, { type: status });
    console.log('setActivity called');
}