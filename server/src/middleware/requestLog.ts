import { Context } from "koa";
import { getLogger } from "log4js";
export function requestLog() {
  return async (cxt: Context, next: () => Promise<any>) => {
      let requestBody = cxt.method === 'GET'?cxt.request.query:cxt.request.body;
      let time = Date.now();
      getLogger().info(`--> ${cxt.method} ${cxt.originalUrl} ${JSON.stringify(requestBody)}`);
      await next();
      getLogger().info(`<-- ${cxt.method} ${cxt.originalUrl} ${Date.now()-time}ms ${JSON.stringify(cxt.body)}`);
  }
}