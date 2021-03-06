# 使用说明
首次使用时，先运行打包命令，生成dist目录，在根目录新建一个project.config.json（注意，这个配置不会与src中的project.config.json同步），然后在小程序开发工具中打开dist目录即可。

# 命令
```js
let scripts = {
  "start": "cross-env NODE_ENV=prod npm run clean && npm run test && npm run build && npm run build:doc", // 打包构建
  "dev": "cross-env NODE_ENV=dev gulp", // 运行开发环境
  "build": "cross-env NODE_ENV=prod gulp build",
  "watch": "cross-env NODE_ENV=dev gulp watch",
  "clean": "gulp clean", // 清理输出目录
  "test": "mocha --require @babel/register src/miniprogram/test/**/*.js", // 运行测试
  "build:doc": "jsdoc src README.md -r -t node_modules/docdash -c jsdoc.json -d ./docs", // 构建文档
  "lint": "eslint --fix src" // lint检查并自动修复
}
```

# 特性
- 支持css预处理器
- 支持环境变量注入
- 支持基于rxjs的简易状态管理

# 缺失的功能
- 新版本的小程序已经支持使用一些npm库，这个模板没有支持。实现这个功能很简单，只需要使用webpack等工具将第三方库提前打包即可。
