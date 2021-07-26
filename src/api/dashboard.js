import request from '@/utils/request'
const api = '/biapi'
export function save (param) {
 return request({
  url: `${api}/dashboard/add`,
  method: 'post',
  data: param
 })
}
export function update (param) {
 return request({
  url: `${api}/dashboard/update`,
  method: 'post',
  data: param
 })
}
export function getDashboard (param) {
 return request({
  url: `${api}/dashboard/getAll`,
  method: 'post',
  data: param
 })
}
export function getOne (param) {
 return request({
  url: `${api}/dashboard/query`,
  method: 'post',
  data: param
 })
}
export function addConfig (param) {
 return request({
  url: `${api}/dashboard/addConfig`,
  method: 'post',
  data: param
 })
}
export function setShareStatus (param) {
 return request({
  url: `${api}/dashboard/setShareStatus`,
  method: 'post',
  data: param
 })
}
export function uploadImage (param, headers) {
 return request({
  url: `${api}/tool/saveAvatar`,
  method: 'post',
  data: param,
  headers: headers
 })
}

