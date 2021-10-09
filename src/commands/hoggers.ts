import {runEvent} from '../types/types';
import {CreateEmbed} from '../util/createEmbed';
import { MessageEmbed } from 'discord.js';

export function run(event: runEvent): void
{
    let embed = CreateEmbed('#0099ff','TUSK', 'https://learn.uark.edu', 'Vsauce', 'https://www.pngfind.com/pngs/m/607-6074270_vsauce-face-no-background-hd-png-download.png', 'Hello, this is a description', 
                            'https://www.uark.edu/_resources/images/tusk.jpg' ,'https://www.uark.edu/_resources/images/tusk.jpg', 'tusk', 'https://www.pngfind.com/pngs/m/607-6074270_vsauce-face-no-background-hd-png-download.png')
    event.message.channel.send({embeds: [embed]});
}
export const names = ['tusk', 'hoggers', 'hog'];

