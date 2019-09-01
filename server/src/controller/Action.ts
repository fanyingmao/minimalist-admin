import {Context} from "koa";

/**
 * 获取所有操作配置
 */
export async function getAllAction(context: Context) {


    const posts = 'getAllAction';

    context.body = posts;
}

/**
 * 执行配置操作
 */
export async function postRunAction(context: Context) {


  const posts = 'postRunAction';

  context.body = posts;
}