const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: '音声チャンネルから切断しました。',
			requireMusic: true
		});
	}

	async run(msg) {
		await msg.guild.music.leave();
		return msg.sendMessage(`${msg.guild.me.voice.channel} から切断しました。`);
	}

};
