const { MusicCommand, util: { splitText, showSeconds } } = require('../../index');
const { MessageEmbed } = require('discord.js');
const getInfo = require('util').promisify(require('ytdl-core').getInfo);

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, { description: '現在再生されている曲の情報を表示します。' });
	}

	async run(msg) {
		const { remaining, queue, playing } = msg.guild.music;
		if (!playing) throw `キューに何もありません。`;

		const [song] = queue;
		const info = await getInfo(song.url);
		if (!info.author) info.author = {};

		return msg.sendMessage(new MessageEmbed()
			.setColor(12916736)
			.setTitle(info.title)
			.setURL(`https://youtu.be/${info.vid}`)
			.setAuthor(info.author.name || '不明', info.author.avatar || null, info.author.channel_url || null)
			.setDescription([
				`**長さ**: ${showSeconds(parseInt(info.length_seconds) * 1000)} [残り時間: ${showSeconds(remaining)}]`,
				`**概要**: ${splitText(info.description, 500)}`
			].join('\n\n'))
			.setThumbnail(info.thumbnail_url)
			.setTimestamp());
	}

};
