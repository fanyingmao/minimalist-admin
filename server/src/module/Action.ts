import { ParmaReg, DefaultReg } from "../share/Constant";
import { ActionTypeMap } from "../config/actionBase";
import { IAction, ResCode } from "../share/Api";

export class Action implements IAction {
  public type: number;
  public title: string;
  public module: string;

  constructor(type: number, title: string, module: string) {
    this.type = type;
    this.title = title;
    this.module = module
  }

  getCmdStr(paramArr: string[]): string {
    let cmd = this.module;
    const cmdArr = cmd.match(ParmaReg);
    if (cmdArr) {
      let regArr: RegExp[] = cmdArr.map(item => {
        const reg = item.replace('<', '').replace('>', '').split(',')[1];
        return reg ? new RegExp(reg) : DefaultReg// 未配置默认参数只能是字母数字下划线组成 防止注入漏洞
      });
      for (let i = 0; i < regArr.length; i++) {
        let param = paramArr[i];
        let reg = regArr[i];
        if (!reg.test(param)) {
          throw { code: ResCode.Fail, msg: '参数不合法' }
        }
        cmd = cmd.replace(/\<(.*?)\>/, `${param}`);
      }
    }

    cmd = ActionTypeMap[this.type].Prefix.replace('<subCmd>', cmd);
    return cmd;
  }
}