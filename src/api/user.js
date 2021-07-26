import request from '@/utils/request'
const api = '/biapi'

export function userLogin (param) {
 return request({
  url: `${api}/user/login`,
  method: 'post',
  data: param
 })
}