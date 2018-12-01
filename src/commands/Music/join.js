const { MusicCommand } = require('../../index');
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			aliases: ['connect'],
			description: '音声チャンネルへ接続します。'
		});
	}

	async run(msg) {
		if (!msg.member) {
			await msg.guild.members.fetch(msg.author.id).catch(() => {
				throw '何か問題が発生しました。';
			});
		}

		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) throw '音声チャンネルへ参加してからコマンドを実行してください。';
		if (msg.guild.music.playing) {
			const sneyraVoiceChannel = msg.guild.music.voice.channel;
			if (voiceChannel.id === sneyraVoiceChannel.id) throw 'Turn on your volume! I am playing music there!';
			throw 'I am sorry, but I am playing music in another channel, perhaps try later or ask nicely to the people who came first to join them!';
		}
		this.resolvePermissions(msg, voiceChannel);

		await msg.guild.music.join(voiceChannel);
		return msg.sendMessage(`${voiceChannel} へ接続しました。`);
	}

	resolvePermissions(msg, voiceChannel) {
		if (voiceChannel.full) throw '音声チャンネルが満員のため、参加できません。';

		const permissions = voiceChannel.permissionsFor(msg.guild.me);
		if (!permissions.has(FLAGS.CONNECT)) throw '音声チャンネルへ接続する権限がありません。';
		if (!permissions.has(FLAGS.SPEAK)) throw '音声チャンネルで発声する権限がありません。';
	}

};
