# minimalist-admin
## 基本介绍
基于 react + koa + typescript 开发的一个通过命令行实现后台管理的全栈小项目。实现通过命令模版的配置就可以进行一些简单功能的开发。主要应用情景为一些测试功能的开发，客户端与测试人员经常为了快速测试一些情况需要直接改数据库或系统时间，为了减轻后端这种重复工作量，开发这个工具可以通过命令模版配置而无需写其他代码就可以提供给他们测试用。
## 快速开始(windows 需要拷贝或快捷方式share到server/src 与web/src 下)

### 启动server服务器
进入server目录
```bash
yarn 
```
```bash
yarn start
```
### 启动web服务器
进入web目录
```bash
yarn 
```

```bash
yarn start
```

## 目录结构
```
.
├── README.md
├── server //服务端代码基于koa开发
│   ├── dist
│   ├── logs
│   ├── node_modules
│   ├── package.json
│   ├── src
│   ├── tsconfig.json
│   ├── yarn-error.log
│   └── yarn.lock
├── share // 由于server与web都使用TS开发，这里用了ln -s 命令实现服务端与客户端在src目录下共享代码，mac与linux可用，无法在window下使用
│   ├── Api.ts // 这里定义了 server与web 共用的服务器ip，url，请求参数interface，返回数据interface，返回结果码
│   └── Constant.ts // 这里定义 server与web 共用的一些常量
└── web //客户端代码 主要是使用阿里的ant，dva开发
    ├── dist
    ├── mock
    ├── node_modules
    ├── package.json
    ├── src
    ├── tsconfig.json
    ├── typings.d.ts
    ├── yarn-error.log
    └── yarn.lock
```
## 配置使用
### ip白名单配置
```
server/src/config/ipWhitelist.json
```
出于安全和不做账号认证的考虑，需要配置ip白名单对用户过滤。

### 基本模版模版配置

配置文件路径 
```
server/src/config/actionBase.ts
```
单条配置示例
```ts
  redis: {
    type: 2,
    Prefix: `${BasePrefix}  redis-cli <subCmd>`
  }
```
基本配置模版是对功能配置模版中的命令套上一个外层命令，type为不重复的常量就可以了，BasePrefix是对命令再套入一个ssh 进行远程执行使用的， <subCmd> 代表功能命令，执行时会被替换

如 ssh，mysql，redis,目前配置是这样的
```ts
const BasePrefix = ``;//这里填要远程执行的ssh如果是本机的话为空
export const ActionType = {
  system: {
    type: 0,
    Prefix: `${BasePrefix} <subCmd>`
  },
  mysql: {
    type: 1,
    Prefix: `${BasePrefix} \' mysql -h xxxxxxx -uroot -pxxxxxxx --database=xxxxxxx -e \"<subCmd>\"\'` //这里根据自己数据库进行配置
  },
  redis: {
    type: 2,
    Prefix: `${BasePrefix}  redis-cli <subCmd>`
  }
}
```

### 功能模版配置
配置文件路径
```
server/src/config/actionList.ts
``` 
配置示例
```ts
const dateReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.source;//日期正则
export const actionList:Action[]=[
  new Action(ActionType.system.type,'查看系统时间',`date  '+%Y-%m-%d %H:%M:%S'`),
  new Action(ActionType.system.type,'设置系统时间',`date -s '<设置时间,${dateReg}>'`),
]
```
这里的Action对象中有三个参数分别为命令类型，功能说明，命令模版，命令模版中根据功能所需要的输入参数配置两个参数 “<设置时间,${dateReg}>”两个参数分别代表输入框label文案，输入框正则表达式，如果正则表达式省略则输入框默认只允许数字母下划线组成的字符串，防止sql或命令注入。

## Todo
* 界面展示感觉还需要优化下
* 考虑添加执行历史记录的功能
* 添加docker的示例