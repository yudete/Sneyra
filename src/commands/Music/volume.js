const { MusicCommand, klasaUtil: { codeBlock } } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			// Disabled until Krypton lands stable
			enabled: false,
			aliases: ['vol'],
			usage: '[control:string]',
			description: '音量を調節します。',
			extendedHelp: [
				"'volume ++++' や 'volume ----' といった表現でボリュームを調節できます。",
				"'+' と入力するほど、音量は大きくなり、",
				"'-' と入力するほど、音量は小さくなります。",
			].join('\n'),
			requireMusic: true
		});
	}

	async run(msg, [vol]) {
		const { dispatcher, playing } = msg.guild.music;
		if (!playing) throw `何も再生されていません。`;

		if (!vol) return msg.sendMessage(`📢 音量: ${Math.round(dispatcher.volume * 50)}%`);
		if (/^[+]+$/.test(vol)) {
			if (Math.round(dispatcher.volume * 50) >= 100) return msg.sendMessage(`📢 音量: ${Math.round(dispatcher.volume * 50)}%`);
			dispatcher.setVolume(Math.min(((dispatcher.volume * 50) + (2 * (vol.split('+').length - 1))) / 50, 2));
			return msg.sendMessage(`${dispatcher.volume === 2 ? '📢' : '🔊'} 音量: ${Math.round(dispatcher.volume * 50)}%`);
		}

		if (/^[-]+$/.test(vol)) {
			if (Math.round(dispatcher.volume * 50) <= 0) return msg.sendMessage(`🔇 音量: ${Math.round(dispatcher.volume * 50)}%`);
			dispatcher.setVolume(Math.max(((dispatcher.volume * 50) - (2 * (vol.split('-').length - 1))) / 50, 0));
			return msg.sendMessage(`${dispatcher.volume === 0 ? '🔇' : '🔉'} 音量: ${Math.round(dispatcher.volume * 50)}%`);
		}

		throw `このコマンドはちょっとアナログなので、使い方を説明します:${codeBlock('', this.extendedHelp)}`;
	}

};
