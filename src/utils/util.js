export function timeFix () {
 const time = new Date()
 const hour = time.getHours()
 return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
export function isExternal (path) {
 return /^(https?:|mailto:|tel:)/.test(path)
}
export function welcome () {
 const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
 const index = Math.floor(Math.random() * arr.length)
 return arr[index]
}
export function _debounce (fn, delay = 300) { // 默认300毫秒
 let timer
 return function () {
  var args = arguments
  if (timer) {
   clearTimeout(timer)
  }
  timer = setTimeout(() => {
   fn.apply(this, args) // this 指向vue
  }, delay)
 }
}
export function _clone (data) {
 return JSON.parse(JSON.stringify(data))
}
export function _isExist (arr, id, val) {
 let value = -1
 for (let i = 0; i < arr.length; i++) {
  let curVal = arr[i]
  if (id) {
   curVal = curVal[id]
  }
  if (curVal === val) {
   value = i
   break
  }
 }
 return value
}
export function _concat (arr) {
 let val = []
 for (let i = 0; i < arr.length; i++) {
  val = val.concat(arr[i])
 }
 return val
}
export function _eval (val, operator, val1) {
 if (operator === '==') {
  return val === val1
 } else if (operator === '<=') {
  return val <= val1
 } else if (operator === '>') {
  return val > val1
 } else if (operator === '>=') {
  return val >= val1
 } else if (operator === '<') {
  return val < val1
 }
}
/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
 const event = document.createEvent('HTMLEvents')
 event.initEvent('resize', true, true)
 event.eventType = 'message'
 window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
 let timer = 0

 let beforeScrollTop = window.pageYOffset
 callback = callback || function () { }
 window.addEventListener(
  'scroll',
  event => {
   clearTimeout(timer)
   timer = setTimeout(() => {
    let direction = 'up'
    const afterScrollTop = window.pageYOffset
    const delta = afterScrollTop - beforeScrollTop
    if (delta === 0) {
     return false
    }
    direction = delta > 0 ? 'down' : 'up'
    callback(direction)
    beforeScrollTop = afterScrollTop
   }, 50)
  },
  false
 )
}

export function isIE () {
 const bw = window.navigator.userAgent
 const compare = (s) => bw.indexOf(s) >= 0
 const ie11 = (() => 'ActiveXObject' in window)()
 return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
 if (id === '') {
  return
 }
 setTimeout(() => {
  document.body.removeChild(document.getElementById(id))
 }, timeout)
}
export function _getDiff (obj1, obj2, diff, parentKey) {
 for (let key in obj1) {
  if (Object.prototype.toString.call(obj1[key]) === "[object Object]" && Object.prototype.toString.call(obj2[key]) === "[object Object]") {
   let newKey = parentKey ? (parentKey + "-" + key) : key
   _getDiff(obj1[key], obj2[key], diff, newKey)
  } else if (Object.prototype.toString.call(obj1[key]) === "[object Array]" && Object.prototype.toString.call(obj2[key]) === "[object Array]") {
   if (obj1[key].length != obj2[key].length) {
    let newKey = parentKey ? (parentKey + "-" + key) : key
    diff.key = newKey
    diff.value = obj1[key]
   }
  } else {
   if (typeof (obj1[key]) != typeof (obj2[key])) {
    let newKey = parentKey ? (parentKey + "-" + key) : key
    diff.key = newKey
    diff.value = obj1[key]
   } else {
    if (obj2[key] != obj1[key]) {
     let newKey = parentKey ? (parentKey + "-" + key) : key
     diff.key = newKey
     diff.value = obj1[key]
    }
   }
  }
 }
}
export function _diffArr (arr1, arr2) {
 let index = -1
 for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] != arr2[i]) {
   index = i
   break
  }
 }
 return { index }
}
export function _arrToobject (data, key) {
 let map = {}
 for (let i = 0; i < data.length; i++) {
  map[data[i][key]] = data[i]
 }
 return map
}
export function _merge (obj1, obj2) {
 for (let key in obj1) {
  if (Object.prototype.toString.call(obj1[key]) === "[object Object]") {
   _merge(obj1[key], obj2[key])
  } else {
   obj1[key] = obj2[key]
  }
 }
}
export function _addChartParm (chart) {
 let param = {}
 param.title = JSON.stringify(chart.title)
 param.common = JSON.stringify(chart.common)
 param.dataset = JSON.stringify(chart.dataset)
 param.fields = JSON.stringify(chart.fields)
 param.option = JSON.stringify(chart.option)
 param.position = JSON.stringify(chart.position)
 param.type = chart.type
 if (chart.uuid) {
  param.uuid = chart.uuid
 }
 return param
}
export function _getChartParm (chart) {
 let param = {}
 param.title = JSON.parse(chart.title)
 param.common = JSON.parse(chart.common)
 param.dataset = JSON.parse(chart.dataset)
 param.fields = JSON.parse(chart.fields)
 param.option = JSON.parse(chart.option)
 param.position = JSON.parse(chart.position)
 param.type = chart.type
 param.uuid = chart.uuid
 return param
}
export function _getArrayIndex (arr, key, value) {
 let obj = { index: '', obj: {} }
 if (arr && arr.length > 0) {
  for (let i = 0; i < arr.length; i++) {
   if (arr[i][key] == value) {
    obj = { index: i, obj: arr[i] }
    break
   }
  }
 }
 return obj
}
export function _getFieldType (value) {
 let fieldType = "dimension"
 let type = 'varchar'
 if (Number(value) || Number(value) == 0) {
  fieldType = "measure"
  type = 'int'
 } else {
  if (isNaN(value) && !isNaN(Date.parse(value))) {
   type = 'datetime'
  }
 }
 return { fieldType, type }
}
export function _uuid () {
 var s = [];
 var hexDigits = "0123456789abcdef";
 for (var i = 0; i < 36; i++) {
  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
 }
 s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
 s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
 s[8] = s[13] = s[18] = s[23] = "-";

 var uuid = s.join("");
 return uuid;
}
