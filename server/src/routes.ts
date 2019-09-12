import { getAllAction, postRunAction } from "./controller/Action";
import { Middleware, ParameterizedContext } from "koa";

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
  getRoute("/api/getAllAction", METHODS.GET, getAllAction),
  getRoute("/api/postRunAction", METHODS.POST, postRunAction),
];