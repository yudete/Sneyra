const { MusicCommand, util: { showSeconds } } = require('../../index');

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, { description: '次の曲が再生されるまでの時間を表示します。' });
	}

	async run(msg) {
		const { playing, remaining } = msg.guild.music;
		if (!playing) throw `何も再生していません。`;
		return msg.sendMessage(`🕰 残り時間: ${showSeconds(remaining)}`);
	}

};
