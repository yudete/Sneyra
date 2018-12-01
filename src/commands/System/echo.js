const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['talk'],
			description: '他のチャンネルへチャットを送信します。',
			permissionLevel: 10,
			usage: '[channel:channel] [message:string] [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [channel = msg.channel, ...content]) {
		if (msg.deletable) msg.delete().catch(() => null);

		const attachment = msg.attachments.size > 0 ? msg.attachments.first().url : null;
		content = content.length ? content.join(' ') : '';

		if (content.length === 0 && !attachment) throw '送信する文章がありません。何か指定してください。';

		const options = {};
		if (attachment) options.files = [{ attachment }];

		return channel.send(content, options);
	}

};
