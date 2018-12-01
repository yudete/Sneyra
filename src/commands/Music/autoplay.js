const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: 'オート再生を切り替えます。',
			extendedHelp: [
				'Sneyra は勝手に大量のファイルをダウンロードするため、気をつけてください。'
			].join(' '),
			requireMusic: true
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		const enabled = !music.autoplay;

		music.autoplay = enabled;

		return msg.sendMessage(enabled
			? `Sure thing! I'll keep playing decks until you get bored!`
			: `I stopped auto-playing songs, just make sure to give me some songs later!`);
	}

};
