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
    paramArr.forEach(param=>{
      cmd = cmd.replace(/\[.{0,10}\]/,` '${param}' `);
    });
    return cmd;
  }
}