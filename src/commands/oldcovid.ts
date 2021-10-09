const axios = require('axios').default
const cheerio = require('cheerio')
import {runEvent} from '../types/types';


let stored: any = {
    newPositive: null,
    newRecover: null,
    currCases: null,
    totalCases: null,
    retrieved: null
};

export function run(event: runEvent): void
{
    let dat = scrape();
    console.log(dat)
    // if(stored.newPositive != null)
    //     event.message.reply(stored);
    

}
export const names = ['oldcovid'];



const url = 'https://health.uark.edu/coronavirus/covid-dashboard.php';



const fetchPage = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error('Failed to get page', url);
    };
};


function scrape(){
    let data: any = [];
    fetchPage(url).then((res) => {
        if(res) {
            try {
                const selector = cheerio.load(res);
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
            } catch {
                console.error('Failed to extract data');
            }
        }
    }).finally(()=> {
        stored = {
            newPositive: data[0],
            newRecover: data[1],
            currCases: data[2],
            totalCases: data[3],
            retrieved: new Date().toLocaleString()
        }
    });
}
