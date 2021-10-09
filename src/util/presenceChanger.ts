import {Client} from 'discord.js';

export enum PresenceData{
    ONLINE     = 'online',
    IDLE       = 'idle',
    INVISIBLE  = 'invisible',
    DND        = 'dnd'
}

export function changePresence(client: Client, presence: PresenceData, text: string): void{
    client.user?.setPresence({activities: [{name: text}], status: presence});
    console.log('setPresence called');
}