
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cdfdf0081ea4438e86ea6971a021d6b0)](https://www.codacy.com/app/kyranet/Sneyra?utm_source=github.com&utm_medium=referral&utm_content=kyranet/Sneyra&utm_campaign=badger)

# Sneyra

Sneyra は [Klasa](https://github.com/dirigeants/klasa/) をベースとし、[Discord.js](https://github.com/hydrabolt/discord.js) を Discord API へ接続するために使用する music bot です。

## Features

- すべての基本的なmusic botのコマンドが搭載されており、スキップ機能も含まれます。
- echo コマンドもあります。なんであったらアカンの？
- 美しいコードで、編集しやすいです。完璧にモジュール化・クラス化されています。
- Full Music Handler interface and caching, make sure she replies 'smartly'!

## Requirements

- `git`
- `node` [バージョン 8.1.0 以上](https://nodejs.org)
- `ffmpeg`: `npm install --global ffmpeg-binaries`
- `node-opus`: `npm install node-opus` (opusscript を使うこともできますが、不安定です。本番環境ではメモリリークや音質の問題があるため、推奨しません。)
- イケてるインターネット回線

## Downloading

以下のコマンドであなたのコンピュータへダウンロードできます。

```
git clone https://github.com/yudete/Sneyra
```

次に、これらの操作をしてください:

- git コマンドを実行した場所で `cd Sneyra` を実行し、それから `npm install` を実行してください。
- `config.json.example` を `config.json` へリネームしてください。
- `config.json` を編集し、あなたの bot の token や YouTube Search API の token を入力してください。
- **設定ファイルをインターネット上にアップロードしないでください。そうすると、誰でもあなたの bot を操作できるようになってしまい、挑戦的な破壊を試みる可能性があります。もし、すでにアップロードしてしまった場合、Discord Application のページで token をリセットしてください。**.
