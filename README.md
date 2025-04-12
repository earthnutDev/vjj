# ☝️🍳 的 npm 版本号更新 🔧

[![version](<https://img.shields.io/npm/v/vjj.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/vjj) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/vjj?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/vjj?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/vjj/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/vjj) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/vjj/issues)

## 📦 安装

```bash
npm install  vjj --save-dev
```

## 📖 使用

```bash
# 原包为 0.0.0
npx vjj -id aa # 使用预发布 preid => 0.0.1-aa.0
npx vjj -b # 使用 `npm run build` 开启打包测试
npx vjj -u # 使用 `npm update --save` 更新依赖包
npx vjj -p # 使用 `npm publish` 推送 npm 包
```

在包本地版本与 npm 版本不一致时，会显示一个版本不同的提示，但该提示不会影响后续的操作。该提示是采用本地的项目的 `package.json` 中的项目名与 npm 上的同名版本号进行比较，如果不一致，则会显示该提示。所以，可能有误。

可以使用 `-n` (`--no-diff`) 选项来忽略该提示。除非显式的设置 `-n=false`，否则设置了该选项其默认值为 `true`。但不设置该值时，默认展示该提示。

```bash
# 使用全拼禁止获取线上同名 npm 包信息
npx vjj --no-diff
# 使用缩写禁止获取线上同名 npm 包信息
npx vjj -n
```

## 📄 文档地址

参看 [https://earthnut.dev/vjj/](https://earthnut.dev/vjj/)
