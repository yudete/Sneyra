const { MusicCommand, klasaUtil: { sleep } } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, { description: 'キューへ追加されている曲の再生を開始します。' });
	}

	async run(msg) {
		const { music } = msg.guild;

		if (!music.queue.length)
			return msg.sendMessage(`コマンド `${msg.guild.settings.prefix}add\` を使って、何か曲を追加してください。`);

		if (!music.voiceChannel) await this.store.get('join').run(msg);

		if (music.playing) {
			return msg.sendMessage('すでに再生されています。');
		} else if (music.paused) {
			music.resume();
			return msg.sendMessage(`一時停止を解除しました。 再生中: ${music.queue[0].title}!`);
		} else {
			music.channel = msg.channel;
			return this.play(music);
		}
	}

	async play(music) {
		while (music.queue.length) {
			const [song] = music.queue;
			await music.channel.send(`🎧 再生中: **${song.title}** by **${song.requester}**`);
			await sleep(300);

			try {
				if (!await new Promise(async (resolve) => {
					(await music.play())
						.on('end', () => {
							music.skip();
							resolve(true);
						})
						.on('error', (err) => {
							music.channel.send('なにか問題が発生しました。');
							music.client.emit('error', err);
							music.skip();
							resolve(true);
						})
						.once('disconnect', () => {
							resolve(false);
						});
				})) return;

				// Autofetch if the autoplayer is enabled
				if (!music.queue.length && music.autoplay) await this.autoPlayer(music);
			} catch (error) {
				this.client.emit('error', error);
				music.channel.send(error);
				music.leave();
				break;
			}
		}

		if (!music.queue.length) {
			music.leave();
		}
	}

	autoPlayer(music) {
		return music.add('YouTube AutoPlay', music.next);
	}

};
