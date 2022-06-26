<p align="center">⚡️ 1s to GitHub1s!</p>

<p align="center">
  <img src="./screenshots/github1s.png" />
</p>

## Installation

1. clone this repo

```sh
git clone git@github.com:holazz/webext-github1s.git
```

2. build extension

```sh
pnpm i && pnpm build
```

3. Open `chrome://extensions/` and Enable `Developer Mode`

4. Click `Load Unpacked` and select the `dist` folder you just built

## Options

| name | description | default |
| --- | --- | --- |
| `Button Type` | The type of button injected into the page (`icon`/`text`) | `icon` |
| `Hotkey` | Shortcuts to open GitHub1s | `,` |
| `New Tab` | whether to open GitHub1s in a new tab | `true` |

> **Note**
>
> For hotkey configuration, please refer to [github/hotkey](https://github.com/github/hotkey)

## License

[MIT](./LICENSE) License © 2022 [zz](https://github.com/holazz)
