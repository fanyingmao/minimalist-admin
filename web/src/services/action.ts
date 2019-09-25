import request from '@/utils/request';
import { RoutePostRunAction, RouteGetAllAction } from '@/share/Api';

export async function getAllAction(): Promise<any> {
  return request(RouteGetAllAction, {
    method: 'GET',
  });
}
export interface RunParamsType {

}

export async function postRunAction(params: RunParamsType) {
  return request(RoutePostRunAction, {
    method: 'POST',
    data: params,
  });
}
