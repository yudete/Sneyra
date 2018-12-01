const { MusicCommand, util: { showSeconds } } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, { description: 'キューの中を覗き込みます。' });
	}

	async run(msg) {
		const { next, queue, autoplay } = msg.guild.music;
		const output = [];
		for (let i = 0; i < Math.min(queue.length, 10); i++) {
			output[i] = [
				`[__\`${String(i + 1).padStart(2, 0)}\`__] *${queue[i].title.replace(/\*/g, '\\*')}* by **${queue[i].requester.tag || queue[i].requester}**`,
				`   └── <https://youtu.be/${queue[i].url}> (${showSeconds(queue[i].seconds * 1000)})`
			].join('\n');
		}
		if (queue.length > 10) output.push(`\n${queue.length}中10個のキュー内の項目を表示しています。`);
		else if (autoplay) output.push(`\n**オート再生**: <${next}>`);

		return msg.sendMessage(output.join('\n'));
	}

};
