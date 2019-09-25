import { ActionTypeMap } from "../../config/actionBase";

export class Action {
  private type: number;
  private title: string;
  private module: string;

  constructor(type: number, title: string, module: string) {
    this.type = type;
    this.title = title;
    this.module = module
  }

  getCmdStr(paramArr:string[]):string{
    let cmd = this.module;
    let regArr:RegExp[] = cmd.match(/\[(.*?)\]/g).map(item=>item?new RegExp(item):/.*/);
    for(let i = 0;i<regArr.length;i++){
      let param = paramArr[i];
      let reg = regArr[i];
      if(!reg.test(param)){
        // throw {code }
      }
      cmd = cmd.replace(/\[(.*?)\]/,`${param}`);
    }
    cmd = ActionTypeMap[this.type].Prefix.replace('<subCmd>',cmd);
    return cmd;
  }
}