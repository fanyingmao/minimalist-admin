import { ActionType} from "./actionBase";
import { Action } from "../module/Action";

export const actionList:Action[]=[
  new Action(ActionType.system.type,'查看系统时间',`date  '+%Y-%m-%d %H:%M:%S'`),
  new Action(ActionType.system.type,'设置系统时间',`date -s '[设置时间]'`),
  new Action(ActionType.system.type,'同步系统时间',`ntpdate ntp1.aliyun.com`),
  new Action(ActionType.mysql.type,'设置兑换次数',`SELECT * FROM t_player_exchange_num WHERE user_id IN (SELECT id from t_player_data where user_code=[玩家code]);`),
  new Action(ActionType.redis.type,'查看玩家资源状态',`hgetall PlayerAmountByUserId:[玩家id]`),
  new Action(ActionType.redis.type,'设置玩家累计领取红包券',`hset PlayerAmountByUserId:[玩家id] red_packet_total [红包券]`),
];
