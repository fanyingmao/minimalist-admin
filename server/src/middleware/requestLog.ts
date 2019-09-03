import { Context } from "koa";
import ipList = require("../config/ipWhitelist.json");
import { createContext } from "vm";
import { getLogger } from "log4js";
export function requestLog() {
  return async (cxt: Context, next: () => Promise<any>) => {
      let requestBody = cxt.method === 'GET'?cxt.request.query:cxt.request.body;
      getLogger().info(`url:${cxt.originalUrl} -${cxt.method} body:${JSON.stringify(requestBody)}`);
      await next();
      getLogger().info(`url:${cxt.originalUrl} -${cxt.method} msg:${JSON.stringify(cxt.body)}`);
  }
}