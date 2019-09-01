import { Context } from "koa";
import ipList = require("../config/ipWhitelist.json");
import { createContext } from "vm";
export function ipWhitelist() {
  return async (cxt: Context, next: () => Promise<any>) => {
    let ip = cxt.request.ip.replace(/::ffff:/, '');
    if (ipList.includes(ip)) {
      await next();
    }
    else {
      cxt.body = { code: 1, msg: "ip不在白名单中" };
    }
  }
}