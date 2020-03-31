import { ActionType} from "./actionBase";
import { Action } from "../module/Action";

const dateReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.source;//日期正则
const numReg = /^-?[1-9]\d*$/.source;//匹配整数
const znumReg = /^[1-9]\d*$/.source;//匹配正整数

export const actionList:Action[]=[
  new Action(ActionType.system.type,'查看系统时间',`date  '+%Y-%m-%d %H:%M:%S'`),
  new Action(ActionType.system.type,'设置系统时间',`date -s '<设置时间,${dateReg}>'`),
  new Action(ActionType.system.type,'同步系统时间',`ntpdate ntp1.aliyun.com`),
  new Action(ActionType.system.type,'查看PWD',`pwd`),
  new Action(ActionType.system.type,'ping ',`ping www.baidu.com`),
  new Action(ActionType.system.type,'server-重启webserver',`forever restart 0`),
  new Action(ActionType.redis.type,'设置玩家累计领取红包券',`-n %type1%  hset PlayerAmountByUserId:<玩家id> red_packet_total <红包券,${znumReg}>`),
  new Action(ActionType.redis.type,'设置玩家红包券',`-n %type1% hset PlayerAmountByUserId:<玩家id> gold <红包券,${znumReg}>`),
  new Action(ActionType.redis.type,'设置玩家金币',`-n %type1% hset PlayerAmountByUserId:<玩家id> gold <金币,${znumReg}>`),
  new Action(ActionType.mysql.type,'查看sys_config',`SELECT * FROM t_sys_conf `),
  new Action(ActionType.mysql.type,'设置sys_config值',`UPDATE t_sys_conf SET value=<value> WHERE id='<id,${znumReg}>';`),
  new Action(ActionType.mysql.type,'重置兑换次数',`UPDATE t_player_exchange_num set num=0 WHERE user_id IN (SELECT id from t_player_data where user_code=<玩家code>);`),
  new Action(ActionType.mysql.type,'直接绑定手机',`UPDATE t_player_data set user_tel=<手机号> where user_code=<玩家code>;`),
  new Action(ActionType.mysql.type,'直接修改渠道号',`UPDATE t_player_data set channel_id=<渠道号> where user_code=<玩家code>;`),
  new Action(ActionType.mysql.type,'重置玩家累计签到次数',`update  t_player_sign_continuous_total set sign_total=<次数,${znumReg}> WHERE uid IN (SELECT id from t_player_data where user_code=<玩家code>);`),
  new Action(ActionType.mysql.type,'重置玩家九阶登陆次数',`update  t_player_sign set login_times=<次数,${znumReg}> WHERE uid IN (SELECT id from t_player_data where user_code=<玩家code>);`),
  new Action(ActionType.systemLocal.type,'sever-更新proto',`svn up /home/fanyingmao/svn/trunk/protoGen/protos`),
];
