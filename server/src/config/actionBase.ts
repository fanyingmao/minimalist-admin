export const ActionType = {
  system: {
    type: 0,
    Prefix: ""
  },
  mysql: {
    type: 1,
    Prefix: ""
  },
  redis: {
    type: 2,
    Prefix: ""
  }
}
 let temMap:any = {};
 Object.keys(ActionType).forEach(key=>temMap[ActionType[key].type] = ActionType[key]);
 export const ActionTypeMap = temMap;