import {runEvent} from '../types/types';
import { MessageEmbed } from 'discord.js';

export const names = ['tusk', 'hoggers', 'hog'];

export function run(event: runEvent): void
{
    let embed = new MessageEmbed()
            .setTitle('TUSK')
            .setColor('#0099ff')
            .setImage('https://www.uark.edu/_resources/images/tusk.jpg')
            .setDescription('Tusk is a hog');
    event.message.channel.send({embeds: [embed]});
}


