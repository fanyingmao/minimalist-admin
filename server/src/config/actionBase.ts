/**
 * 这里需要注意数据库密码，服务器ip域名不能提交到github
 * 这里进行命令类型的拼接，如mysql redis 将xxxx 换为自己服务器的配置
 */

 const BasePrefix = ``;//这里填要远程执行的ssh如果是本机的话为空
export const ActionType = {
  system: {
    type: 0,
    Prefix: `${BasePrefix} <subCmd>`
    // Prefix: "<subCmd>"
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
 let temMap:any = {};
 Object.keys(ActionType).forEach(key=>temMap[ActionType[key].type] = ActionType[key]);
 export const ActionTypeMap = temMap;