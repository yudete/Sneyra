const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: 'キューを綺麗さっぱり削除します。',
			requireMusic: true
		});
	}

	async run(msg) {
		const { music } = msg.guild;

		if (music.voiceChannel.members.size > 4)
			if (!await msg.hasAtLeastPermissionLevel(5)) throw '4人以上接続している音声チャンネルでこのコマンドを実行することはできません。';

		music.prune();
		return msg.sendMessage(`🗑 Pruned ${music.queue.length}`);
	}

};
