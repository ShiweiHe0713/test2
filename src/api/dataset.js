import request from '@/utils/request'
const api = '/biapi'

export function getAllExceldata (param) {
 return request({
  url: `${api}/dataset/getAllExceldata`,
  method: 'post',
  data: param
 })
}
export function getAllField (param) {
 return request({
  url: `${api}/dataset/getAllField`,
  method: 'post',
  data: param
 })
}
export function getDataSetlist (param) {
 return request({
  url: `${api}/dataset/getAll`,
  method: 'post',
  data: param
 })
}
export function getDataSetFiledlist (param) {
 return request({
  url: `${api}/dataset/query`,
  method: 'post',
  data: param
 })
}
export function getDataSetFieldList (param) {
 return request({
  url: `${api}/dataset/query`,
  method: 'post',
  data: param
 })
}
export function getDataSetFieldListDimension (param) {
 return request({
  url: `${api}/dataset/field/dimension`,
  method: 'post',
  data: param
 })
}
export function getDataSetFieldListMeasure (param) {
 return request({
  url: `${api}/dataset/field/measure`,
  method: 'post',
  data: param
 })
}
export function saveExcel (param) {
 return request({
  url: `${api}/save/excel`,
  method: 'post',
  data: param
 })
}
export function saveInterface (param) {
 return request({
  url: `${api}/dataset/saveInterface`,
  method: 'post',
  data: param
 })
}
export function getDataset (param) {
 return request({
  url: `${api}/dataset/getDataset`,
  method: 'post',
  data: param
 })
}
export function getExcelData (param) {
 return request({
  url: `${api}/dataset/getExcelData`,
  method: 'post',
  data: param
 })
}
export function connectSql (param) {
 return request({
  url: `${api}/dataset/connectSql`,
  method: 'post',
  data: param
 })
}
export function saveSql (param) {
 return request({
  url: `${api}/dataset/saveSql`,
  method: 'post',
  data: param
 })
}
export function getSqlData (param) {
 return request({
  url: `${api}/dataset/getSqlData`,
  method: 'post',
  data: param
 })
}
export function getSqlFieldData (param) {
 return request({
  url: `${api}/dataset/getSqlFieldData`,
  method: 'post',
  data: param
 })
}



