const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: '再生中の曲を一時停止します。',
			requireMusic: true
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) throw '何も再生されていません。';

		music.pause();
		return msg.sendMessage('⏸ 一時停止しました。');
	}

};
