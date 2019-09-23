import "reflect-metadata";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { AppRoutes } from "./routes";
const logger = require('koa-logger');

import { ipWhitelist } from "./middleware/ipWhitelist";
import { requestLog } from "./middleware/requestLog";
import { LogManager } from "./utils/InitConfig";
import { getLogger } from "log4js";
import cors = require('@koa/cors');

LogManager.initLog();
// create koa app
const app = new Koa();
const router = new Router();

// register all application routes
AppRoutes.forEach(route => router[route.method](route.path, route.action));

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://buyu.fanym.top:8000';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// run app
app.use(bodyParser());
// app.use(logger);
app.use(requestLog());
app.use(ipWhitelist());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

getLogger().info("Koa application is up and running on port 3000");
