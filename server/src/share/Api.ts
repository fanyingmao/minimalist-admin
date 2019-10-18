export class Api {
  public static readonly ServerPort: number = 3000;
  public static readonly WebPort: number = 8000;//开发阶段web端口与server端口不一致
  public static getBaseUrl(isServer: boolean) {
    return `http://127.0.0.1:${isServer ? Api.WebPort : Api.ServerPort}`;//这里改为自己运行环境的ip或域名
  }
}

export enum ResCode {
  Success = 0,
  Fail = 1,
}
interface IBaseRes<T> {//基本返回接口
  code: number,
  data?: T,
  msg?: string,
};

export interface IAction {
  type: number;
  title: string;
  module: string;
}
//这里api Url 命名用驼峰命名方便新增接口直接替换，降低开发工作量
export const RouteGetAllAction = "/GetAllAction";//获取action接口
export interface IRsqGetAllAction { };
export interface IResGetAllAction extends IBaseRes<//出参接口
  IAction[]
  > { };

export const RoutePostRunAction = "/PostRunAction";//提交action接口
export interface IRsqPostRunAction { index: string, params: string };
export interface IResPostRunAction extends IBaseRes<string> { };