import request from '@/utils/request';

export async function getAllAction(): Promise<any> {
  return request('/api/getAllAction', {
    method: 'GET',
  });
}
export interface RunParamsType {

}

export async function postRunAction(params: RunParamsType) {
  return request('/api/postRunAction', {
    method: 'POST',
    data: params,
  });
}
