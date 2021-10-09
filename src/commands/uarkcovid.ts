import axios from 'axios';
import {load as cheerioload} from 'cheerio';
import {MessageEmbed} from 'discord.js'
import {runEvent, covidData} from '../types/types';

const url = 'https://health.uark.edu/coronavirus/covid-dashboard.php';

export function run(event: runEvent): void
{
    let dat = scrape();
    dat.then((res: covidData) => {
        const embed = new MessageEmbed()
        .setTitle('UARK Covid Stats')
        .setColor('#ff0000')
        .addField('Current Cases', res.currCases, true)
        .addField('New Positive', res.newPositive, true)
        .addField('Total Cases', res.totalCases, true)
        .addField('Time Retrieved', res.retrieved, true)
        event.message.channel.send({embeds: [embed]});
    });
}
export const names = ['covid'];

async function fetchPage(url: string): Promise<string>{
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error('Failed to get page', url);
        return ""
    };
};

async function scrape(){
    const res = await fetchPage(url);
    let parsed = parse(res);
    return parsed;
}

function parse(res: string): covidData{
    let data:any = [];
    const selector = cheerioload(res);
    let raw = selector('div')
    for (let i = 0; i < raw.length; i++) {
        const num = selector(raw[i]).find('p.bigNumber')[0]
        if (num) {
            const numText = selector(num).text()
            if (!data.includes(numText)) {
                data.push(numText)
            }
        }
    }
    return {
        newPositive: data[0],
        newRecover: data[1],
        currCases: data[2],
        totalCases: data[3],
        retrieved: new Date().toLocaleString()
    }
}
