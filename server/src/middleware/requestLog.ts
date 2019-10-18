import { Context } from "koa";
import { getLogger } from "log4js";
export function requestLog() {
  return async (cxt: Context, next: () => Promise<any>) => {
      let requestBody = cxt.method === 'GET'?cxt.request.query:cxt.request.body;
      let time = Date.now();
      let ip = cxt.request.ip.replace(/::ffff:/, '');
      getLogger().info(`--> ${cxt.method} ${cxt.originalUrl} ${ip} ${JSON.stringify(requestBody)}`);
      await next();
      getLogger().info(`<-- ${cxt.method} ${cxt.originalUrl} ${Date.now()-time}ms ${JSON.stringify(cxt.body)}`);
  }
}