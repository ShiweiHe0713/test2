import request from '@/utils/request'
const api = '/biapi'
export function saveChart (param) {
 return request({
  url: `${api}/chart/add`,
  method: 'post',
  data: param
 })
}
export function updateChart (param) {
 return request({
  url: `${api}/chart/update`,
  method: 'post',
  data: param
 })
}
export function getChart (param) {
 return request({
  url: `${api}/chart/getAll`,
  method: 'post',
  data: param
 })
}
export function getAllChart (param) {
 return request({
  url: `${api}/chart/query`,
  method: 'post',
  data: param
 })
}
export function batchUpdateChart (param) {
 return request({
  url: `${api}/chart/batchUpdate`,
  method: 'post',
  data: param
 })
}
export function deleteChart (param) {
 return request({
  url: `${api}/chart/deleteChart`,
  method: 'post',
  data: param
 })
}
export function addCustomChart (param, headers) {
 return request({
  url: `${api}/chart/addCustomChart`,
  method: 'post',
  data: param,
  headers: headers
 })
}
export function getCommonChart (param) {
 return request({
  url: `${api}/chart/getCommonChart`,
  method: 'post',
  data: param
 })
}


