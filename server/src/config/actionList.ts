import { ActionType, InputType } from "./actionBase";

export const actionList=[
  [ActionType.system,'查看系统时间',`date`],
  [ActionType.system,'设置系统时间',`date -s ${InputType.Date}`],
];
