const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg, cmd) {
		if (cmd.requireMusic !== true) return;

		if (msg.channel.type !== 'text') throw 'このコマンドは、サーバー内でのみ実行できます。';

		if (!msg.member.voice.channel) throw 'あなたは音声チャンネルへ接続していません。';
		if (!msg.guild.me.voice.channel) throw 'このbotはどの音声チャンネルへも接続していません。';
		if (msg.member.voice.channel !== msg.guild.me.voice.channel) throw 'bot と同じ音声チャンネルへ接続してください。';
	}

};
