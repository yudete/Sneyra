const { MusicCommand } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			usage: '<number:integer>',
			description: 'キューから曲を削除します。',
			requireMusic: true
		});
	}

	async run(msg, [number]) {
		if (number <= 0) throw '1以上の数字を指定してください。';
		number--;

		const { music } = msg.guild;
		if (music.queue.length < number) throw `I tried getting that song for you, but I only have ${music.queue.length} songs in my deck!`;

		const song = music.queue[number];
		if (song.requester.id !== msg.author.id)
			if (!await msg.hasAtLeastPermissionLevel(5)) throw DENIED_SONG_REMOVAL;

		music.queue.splice(number, 1);
		return msg.sendMessage(`🗑 **${song.title}** （by **${song.requester}**） を削除しました。`);
	}

};

// The next line is too long to fit above
const DENIED_SONG_REMOVAL = [
	'曲を削除する権限がありません。'
].join(' ');
