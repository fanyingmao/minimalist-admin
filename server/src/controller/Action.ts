import { Context } from "koa";
import { actionList } from "../config/actionList";
import { getLogger } from "log4js";
import { asyncExec } from "../utils/CommonUtils";
import { IResPostRunAction, IRsqPostRunAction, ResCode, IResGetAllAction } from "../share/Api";
import { Action } from "../module/Action";

/**
 * 获取所有操作配置
 */
export async function getAllAction(context: Context) {
  let body: IResGetAllAction = { code: ResCode.Success, data: actionList };
  context.body = body;
}

/**
 * 执行配置操作
 */
export async function postRunAction(context: Context) {
  const { index, params }: IRsqPostRunAction = context.request.body;
  const actionIndex = Number.parseInt(index);
  const paramArr = params.split(',');
  const action: Action = actionList[actionIndex];
  try {// todo:这里要改错误中间件
    const cmd: string = action.getCmdStr(paramArr);
    getLogger().info(`postRunAction cmd: ${cmd}`);
    let body: IResPostRunAction = { code: ResCode.Success };
    try {
      body.data = await asyncExec(cmd);
    }
    catch (e) {
      body.data = e.stack;
    }
    context.body = body;
  }
  catch (e) {
    if (e.code === ResCode.Fail) {
      context.body = e;
    }
  }
}

/**
 * 获取所有操作配置
 */
export async function getLog(context: Context) {
    let requestBody = context.request.query;
    context.body = requestBody;
}