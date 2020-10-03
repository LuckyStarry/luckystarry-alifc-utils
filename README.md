# luckystarry-alifc-utils

一个为阿里云函数计算提供的容器服务，配合 luckystarry-ui 框架使用。

[![Build Status](https://www.travis-ci.org/LuckyStarry/luckystarry-alifc-utils.svg?branch=master)](https://www.travis-ci.org/LuckyStarry/luckystarry-alifc-utils?branch=master)
[![Build Test](https://github.com/LuckyStarry/luckystarry-alifc-utils/workflows/Build%20Test/badge.svg?branch=master)](https://github.com/LuckyStarry/luckystarry-alifc-utils/actions?query=workflow%3A%22Build+Test%22+branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/LuckyStarry/luckystarry-alifc-utils/badge.svg?branch=master)](https://coveralls.io/github/LuckyStarry/luckystarry-alifc-utils?branch=master)
[![Npm Status](https://img.shields.io/npm/v/luckystarry-alifc-utils.svg)](https://www.npmjs.com/package/luckystarry-alifc-utils)
[![install size](https://packagephobia.now.sh/badge?p=luckystarry-alifc-utils)](https://packagephobia.now.sh/result?p=luckystarry-alifc-utils)
[![codebeat badge](https://codebeat.co/badges/8eb8694e-886b-4a46-bb29-07147aef9f0e)](https://codebeat.co/projects/github-com-luckystarry-luckystarry-alifc-utils-master)
[![Known Vulnerabilities](https://snyk.io/test/github/LuckyStarry/luckystarry-alifc-utils/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LuckyStarry/luckystarry-alifc-utils?targetFile=package.json)
[![License Status](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://raw.githubusercontent.com/LuckyStarry/luckystarry-alifc-utils/master/LICENSE)

## Install

```bash
npm i -S luckystarry-alifc-utils
```

## Usage

简单的使用如下所示：

```javascript
// index.js
const alifc = require('luckystarry-alifc-utils')

// 注册处理方法
let handler = alifc.default.register(async (context, utils) => {
  // 登陆保护，需要 headers 中包含 x-jwt-profile 及 x-jwt-sub 使用。头部内容可由阿里云API网关的JWT插件负责填充。
  utils.ensureLogin().getOrThrow()
  return utils.ok()
})

// 导出（由于FC框架的this指针存在风险，建议使用闭包方式绑定。）
module.exports.handler = (event, context, callback) => handler.handle(event, context, callback)
```

## LICENSE

MIT License

Copyright (c) 2020 SUN BO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
