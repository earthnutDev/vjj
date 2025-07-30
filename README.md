# Version Judgment Juggler (vjj ，版本智能预测)

[![version](<https://img.shields.io/npm/v/vjj.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/vjj) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/vjj/issues)

## 📦 安装

```bash
npm install  vjj --save-dev
```

## 📖 使用

```bash
# 原包为 0.0.0
npx vjj -id aa # 使用预发布 preid => 0.0.1-aa.0
npx vjj -b # 使用 `npm run build` 开启打包测试
# v0.3.0 移除了 -u 子选项
# npx vjj -u # 使用 `npm update --save` 更新依赖包
npx vjj -p # 使用 `npm publish` 推送 npm 包
```

### 💡 注意

在包本地版本与 npm 版本不一致时，会显示一个版本不同的提示，但该提示不会影响后续的操作。该提示是采用本地的项目的 `package.json` 中的项目名与 npm 上的同名版本号进行比较，如果不一致，则会显示该提示。所以，可能有误。

可以使用 `-nd` (`--no-diff`) 选项来忽略该提示。除非显式的设置 `-nd=false`，否则设置了该选项其默认值为 `true`。但不设置该值时，默认展示该提示。

```bash
# 不携带 `-nd` 选项时，值默认为 false
npx vjj
# 使用全拼禁止获取线上同名 npm 包信息，值为 true
npx vjj --no-diff
# 使用缩写禁止获取线上同名 npm 包信息，值为 true
npx vjj -nd
# 携带非 `false`  ，下面的情况都认定值为 true
npx vjj -nd=true
npx vjj -nd true
npx vjj -nd=0
npx vjj -nd 0
npx vjj -nd=1
npx vjj -nd 1
npx vjj -nd='a'
npx vjj -nd 'a'
# 下面的值同不适用 `-nd` 选项
npx vjj -nd=false
npx vjj -nd false
```

### 写入 CHANGELOG.md

每一次更新版本号后还要写更新日志，还需要打开 `CHANGELOG.md` 文件，然后再去找当前版本号，当前日期 📅，累之久矣。
现在默认添加会将 `npx version xxx --no-git-tag-version` 的返回值添加到 `CHANGELOG.md` 文件 🀄️。

```bash
# 不携带 `-nc` 选项时，值默认为 false
npx vjj
# 使用全拼禁止获取线上同名 npm 包信息，值为 true
npx vjj --no-changelog
# 使用缩写禁止获取线上同名 npm 包信息，值为 true
npx vjj -nc
# 携带非 `false`  ，下面的情况都认定值为 true
npx vjj -nc=true
npx vjj -nc true
npx vjj -nc=0
npx vjj -nc 0
npx vjj -nc=1
npx vjj -nc 1
npx vjj -nc='a'
npx vjj -nc 'a'
# 下面的值同不使用 `-nc` 选项
npx vjj -nc=false
npx vjj -nc false
```

除非你像设定 `-nd` 选项一样，初显式设置 `-nc=false`，否则携带 `--nc=xx` 或 `--nc xx` 都认定为 `true`，即更新后不写入 CHANGELOG.md 文件。

## 📄 文档地址

参看 [vjj](https://earthnut.dev/npm/vjj/)
