import { Context } from "koa";
import ipList = require("../config/ipWhitelist.json");
import { ResCode } from "../share/Api.js";
export function ipWhitelist() {
  return async (cxt: Context, next: () => Promise<any>) => {
    let ip = cxt.request.ip.replace(/::ffff:/, '');
    if (ipList.includes(ip) || ip === "::1") {
      await next();
    }
    else {
      cxt.body = { code: ResCode.Fail, msg: "ip不在白名单中" };
    }
  }
}