import * as fs from 'fs';
import { startingCredit } from '../socialCredit/socialCredit';

// export interface IGlobalUserData {}

export interface ILocalUserData {
	socialCredit: number;
}

export function updateSocialCredit(
	guildId: string,
	userId: string,
	change: number
) {
	if (fs.existsSync(`./data/${guildId}/${userId}.json`)) {
		const file = fs.readFileSync(`./data/${guildId}/${userId}.json`);
		const data: ILocalUserData = JSON.parse(file.toString());
		data.socialCredit += change;
		fs.writeFileSync(`./data/${guildId}/${userId}.json`, JSON.stringify(data));
	} else if (fs.existsSync(`./data/${guildId}`)) {
		const data: ILocalUserData = { socialCredit: startingCredit + change };
		fs.writeFileSync(`./data/${guildId}/${userId}.json`, JSON.stringify(data));
	} else {
		fs.mkdirSync(`./data/${guildId}`);
		const data: ILocalUserData = { socialCredit: startingCredit + change };
		fs.writeFileSync(`./data/${guildId}/${userId}.json`, JSON.stringify(data));
	}
}

export function getSocialCredit(guildId: string, userId: string) {
	if (fs.existsSync(`./data/${guildId}/${userId}.json`)) {
		const file = fs.readFileSync(`./data/${guildId}/${userId}.json`);
		const data: ILocalUserData = JSON.parse(file.toString());
		return data.socialCredit;
	}
	return startingCredit;
}
