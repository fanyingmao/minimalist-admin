import request from '@/utils/request';

export async function getAllAction(): Promise<any> {
  return request('/api/getAllAction');
}

export async function postRunAction(): Promise<any> {
  return request('/api/postRunAction');
}
