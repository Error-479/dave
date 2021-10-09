import axios from 'axios';
import {load as cheerioload} from 'cheerio';
import {MessageEmbed} from 'discord.js'
import {runEvent, covidData} from '../types/types';

const url = 'https://health.uark.edu/coronavirus/covid-dashboard.php';

export const names = ['covid'];

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

async function fetchPage(url: string): Promise<string>{
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error('Failed to get page', url);
        return ""
    };
};

async function scrape(): Promise<covidData>{
    const res = await fetchPage(url);
    let parsed = parse(res);
    return parsed;
}

function parse(res: string): covidData{
    let data:any = [];
    const selector = cheerioload(res);
    try{
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
    } catch {
        console.log('Error in covid parser, did the site format change?');
        return{
            newPositive: "data error",
            newRecover: "data error",
            currCases: "data error",
            totalCases: "data error",
            retrieved: new Date().toLocaleString()
        }
    }
}
