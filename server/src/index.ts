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
import { Api } from "./share/Api";

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
        return Api.getBaseUrl(true);
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
// app.use(ipWhitelist());//如果不想要白名单可去掉这里
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(Api.ServerPort);

getLogger().info(`Koa application is up and running on port ${Api.ServerPort}`);
