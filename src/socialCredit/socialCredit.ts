import { GuildMember } from 'discord.js';
import Sentiment from 'sentiment';
import { getSocialCredit } from '../model/userData';

export const startingCredit = 0; // Social credit for new users
export const maxCreditChange = 5; // Max credit change per message
export const punishCredit = -30; // Score needed to trigger punishment action
export const punishCreditChange = -2; // Change in score needed to trigger punishment action

export function calculateSocialCredit(content: string): number {
	const analysis = new Sentiment().analyze(content);
	let score = analysis.score + 1;

	console.log(analysis.score, analysis.comparative, content);

	if (score >= maxCreditChange) {
		score = maxCreditChange;
	} else if (score <= -maxCreditChange) {
		score = -maxCreditChange;
	}
	return score;
}

export function doSocialCreditActions(user: GuildMember, scoreChange: number) {
	const score = getSocialCredit(user.guild.id, user.id);
	if (score <= punishCredit && scoreChange < punishCreditChange) {
		console.log('timing out ' + user.nickname);
		user
			.timeout(Math.abs(scoreChange) * 10_000, 'Social credit action')
			.catch(console.log);
	}
}
