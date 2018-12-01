const { Command, util: { exec, codeBlock } } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['execute'],
			description: 'コンソールでコマンドを実行します。ヤバｗ',
			guarded: true,
			permissionLevel: 10,
			usage: '<expression:string>'
		});
	}

	async run(msg, [input]) {
		const result = await exec(input, { timeout: 'timeout' in msg.flags ? Number(msg.flags.timeout) : 60000 })
			.catch(error => ({ stdout: null, stderr: error }));
		const output = result.stdout ? `**\`出力\`**${codeBlock('prolog', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`エラー\`**${codeBlock('prolog', result.stderr)}` : '';

		return msg.sendMessage([output, outerr].join('\n'));
	}

};
