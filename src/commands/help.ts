import {runEvent} from '../types/types';

export const names = ['help', '?'];

export function run(event: runEvent): void
{
    event.message.reply('https://tenor.com/view/hell-naw-to-the-gif-9483305');
}