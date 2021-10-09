import {Client} from 'discord.js';
import { PresenceStatusData } from 'discord.js';

export function changePresence(client: Client, presence: PresenceStatusData, text: string): void{
    client.user?.setPresence({activities: [{name: text}], status: presence});
    console.log('setPresence called');
}