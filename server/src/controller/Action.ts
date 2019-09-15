import { Context } from "koa";
import { actionList } from "../config/actionList";
import { Action } from "../module/Action";
import { getLogger } from "log4js";
import { asyncExec } from "../utils/CommonUtils";

/**
 * 获取所有操作配置
 */
export async function getAllAction(context: Context) {
  context.body = {code:200,data:actionList};
}

/**
 * 执行配置操作
 */
export async function postRunAction(context: Context) {
  const { index, param }: { index: string, param: string } = context.request.body;
  const actionIndex = Number.parseInt(index);
  const paramArr = param.split(',');
  const action: Action = actionList[actionIndex];
  const cmd: string = action.getCmdStr(paramArr);
  getLogger().info(`postRunAction cmd: ${cmd}`);
  let data = await asyncExec(cmd);
  context.body = {code:200,data};
}