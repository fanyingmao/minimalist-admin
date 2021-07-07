import { getAllAction, postRunAction, getLog } from "./controller/Action";
import { Middleware, ParameterizedContext } from "koa";
import { RouteGetAllAction, RoutePostRunAction } from "./share/Api";

enum METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DEL = 'del',
  ALL = 'all'
}

interface IRoute {
  path: string;
  method: METHODS,
  action: Middleware<ParameterizedContext>,
}

function getRoute(path: string, method: METHODS, action: Middleware<ParameterizedContext>): IRoute {
  return { path, method, action }
}

/**
 * All application routes.
 */
export const AppRoutes:IRoute[] = [
  getRoute(RouteGetAllAction, METHODS.GET, getAllAction),
  getRoute(RoutePostRunAction, METHODS.POST, postRunAction),
  getRoute(RouteGetAllAction, METHODS.GET, getLog),
];