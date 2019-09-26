import { ParmaReg } from "../share/Constant";
import { ActionTypeMap } from "../config/actionBase";
import { IAction } from "../share/Api";

export class Action implements IAction{
  public type: number;
  public title: string;
  public module: string;

  constructor(type: number, title: string, module: string) {
    this.type = type;
    this.title = title;
    this.module = module
  }

  getCmdStr(paramArr:string[]):string{
    let cmd = this.module;
    const cmdArr = cmd.match(ParmaReg);
    if(cmdArr){
      let regArr:RegExp[] = cmdArr.map(item=>item?new RegExp(item):/.*/);
      for(let i = 0;i<regArr.length;i++){
        let param = paramArr[i];
        let reg = regArr[i];
        if(!reg.test(param)){
          // throw {code }
        }
        cmd = cmd.replace(/\[(.*?)\]/,`${param}`);
      }
    }

    cmd = ActionTypeMap[this.type].Prefix.replace('<subCmd>',cmd);
    return cmd;
  }
}