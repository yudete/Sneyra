const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: '一時停止されている曲を再開します。',
			requireMusic: true
		});
	}

	async run(msg) {
		if (msg.guild.music.idling) throw '曲がキューの中に追加されていません。';
		if (msg.guild.music.playing) throw 'すでに再生中です。';

		msg.guild.music.resume();
		return msg.sendMessage('▶ リジュームしました。');
	}

};
