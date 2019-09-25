import { ActionType} from "./actionBase";
import { Action } from "../share/module/Action";

let dateReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.source;//日期正则
let numReg = /^-?[1-9]\d*$/.source;//匹配整数
let znumReg = /^[1-9]\d*$/.source;//匹配正整数

export const actionList:Action[]=[
  new Action(ActionType.system.type,'查看系统时间',`date  '+%Y-%m-%d %H:%M:%S'`),
  new Action(ActionType.system.type,'设置系统时间',`date -s '[设置时间,${dateReg}]'`),
  new Action(ActionType.system.type,'同步系统时间',`ntpdate ntp1.aliyun.com`),
  new Action(ActionType.mysql.type,'重置兑换次数',`SELECT * FROM t_player_exchange_num WHERE user_id IN (SELECT id from t_player_data where user_code=[玩家code]);`),
  new Action(ActionType.mysql.type,'设置新手7阶连续登陆天数',`UPDATE t_player_sign set login_times=[连续登陆天数] WHERE uid=[玩家id]);`),
  new Action(ActionType.redis.type,'查看玩家资源状态',`hgetall PlayerAmountByUserId:[玩家id]`),
  new Action(ActionType.redis.type,'设置玩家累计领取红包券',`hset PlayerAmountByUserId:[玩家id] red_packet_total [红包券]`),
];
