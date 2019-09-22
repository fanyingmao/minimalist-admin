import { ActionType} from "./actionBase";
import { Action } from "../module/Action";

export const actionList:Action[]=[
  new Action(ActionType.system.type,'查看系统时间',`date  "+%Y-%m-%d %H:%M:%S"`),
  new Action(ActionType.system.type,'设置系统时间',`date -s [设置时间]`),
  new Action(ActionType.system.type,'同步系统时间',`ntpdate ntp1.aliyun.com`),
];
