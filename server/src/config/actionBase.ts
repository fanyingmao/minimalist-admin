export const ActionType = {
  system: {
    type: 0,
    // Prefix: "ssh root@by.fanym.top '<subCmd>'"
    Prefix: "<subCmd>"
  },
  mysql: {
    type: 1,
    Prefix: "<subCmd>"
  },
  redis: {
    type: 2,
    Prefix: "<subCmd>"
  }
}
 let temMap:any = {};
 Object.keys(ActionType).forEach(key=>temMap[ActionType[key].type] = ActionType[key]);
 export const ActionTypeMap = temMap;