import {
 title,
 grid,
 legend,
 axis,
 color,
 line,
 bar,
 pie,
 scatter,
 table,
 candlestick,
 radar,
 toolbox,
 geo,
 map,
 visualMap
} from './base'
const _clone = function (data) {
 if (data) {
  return JSON.parse(JSON.stringify(data))
 }
}
let dimensions = [
 {
  "uuid": "bf335543-8537-11eb-aac9-ab5fa9f78c66",
  "datasetUuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
  "name": "年",
  "col": "A",
  "alias": "年",
  "type": "int",
  "fieldType": "dimension",
  'axis': 'xAxis'
 },
 {
  "uuid": "bf337c52-8537-11eb-aac9-ab5fa9f78c66",
  "datasetUuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
  "name": "城市",
  "col": "D",
  "alias": "城市",
  "type": "varchar",
  "fieldType": "dimension",
  "isNull": "0",
  "size": 254,
  "param": null
 },
 {
  "uuid": "bf337c50-8537-11eb-aac9-ab5fa9f78c66",
  "datasetUuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
  "name": "月",
  "col": "B",
  "alias": "月",
  "type": "int",
  "fieldType": "measure",
  "isNull": "0",
  "size": 254,
  "param": null,
  "operator": 'sum'
 },
]
let measures = [
 {
  "uuid": "bf335542-8537-11eb-aac9-ab5fa9f78c66",
  "datasetUuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
  "name": "收入",
  "col": "E",
  "alias": "收入",
  "type": "int",
  "fieldType": "measure",
  "operator": 'sum'
 },
 {
  "uuid": "bf335541-8537-11eb-aac9-ab5fa9f78c66",
  "datasetUuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
  "name": "支出",
  "col": "F",
  "alias": "支出",
  "type": "int",
  "fieldType": "measure",
  "operator": 'sum'
 },
]
const fields = {
 dimension: [
  [
   dimensions[0]
  ]
 ],
 measure: [
  [measures[0], measures[1]]
 ],
 filter: [[]]
}
const dataset = {
 "uuid": "bf252470-8537-11eb-aac9-ab5fa9f78c66",
 "name": "sheet",
 "tableName": "fe83f2f23b51479b91e0ddc8d3ea1bf9_sheet",
 "type": "excel",
}
const _getType = (obj) => {
 let type = Object.prototype.toString.call(obj)
 if (type == "[object Object]") {
  return 'object'
 } else if (type == "[object Array]") {
  return 'array'
 }
 return ''
}
const _merge = (obj, old) => {
 if (old) {
  let type = _getType(old)
  if (type) {
   if (type == "array" && (old.length <= 0 || !_getType(old[0]))) {
    obj = old
   } else {
    for (let key in old) {
     let curType = _getType(old[key])
     if (curType && obj[key]) {
      _merge(obj[key], old[key])
     } else {
      obj[key] = old[key]
     }
    }
   }
  }
 }
}
export const _mergechart = (obj) => {
 let option = {
  toolbox: _clone(toolbox),
  color: _clone(color),
  tooltip: { show: true, trigger: 'axis' },
  grid: _clone(grid),
  legend: _clone(legend),
  xAxis: [_clone(axis)],
  yAxis: [_clone(axis)],
  series: []
 }
 _merge(option, obj)
 return option
}
export const chartOption = {
 init: function (type) {
  let option = ''
  switch (type) {
   case 'line':
    option = this.createLine();
    break;
   case 'bar':
    option = this.createBar();
    break;
   case 'pie':
    option = this.createPie();
    break;
   case 'scatter':
    option = this.createScatter();
    break;
   case 'table':
    option = this.createTable();
    break;
   case 'candlestick':
    option = this.createCandlestick();
    break;
   case 'radar':
    option = this.createRadar();
    break;

  }

  return option
 },
 createLine: function () {
  const curline = _clone(line)
  delete curline.areaStyle
  const data = {
   id: '1',
   type: 'lineChart',
   fields: _clone(fields),
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 8,
    h: 6
   },
   common: { line: curline },
   option: {
    toolbox: _clone(toolbox),
    color: _clone(color),
    tooltip: { show: true, trigger: 'axis' },
    grid: _clone(grid),
    legend: _clone(legend),
    xAxis: [_clone(axis)],
    yAxis: [_clone(axis)],
    series: []
   }
  }
  data.option['xAxis'][0].splitLine.show = false
  return _clone(data)
 },
 createBar: function () {
  const curbar = _clone(bar)
  const data = {
   uuid: '',
   type: 'barChart',
   fields: _clone(fields),
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 8,
    h: 6
   },
   common: { bar: curbar },
   option: {
    color: _clone(color),
    toolbox: _clone(toolbox),
    tooltip: { show: true, trigger: 'axis' },
    grid: _clone(grid),
    legend: _clone(legend),
    xAxis: [_clone(axis)],
    yAxis: [_clone(axis)],
    series: []
   }
  }
  data.option['xAxis'][0].boundaryGap = true
  return _clone(data)
 },
 createPie: function () {
  const curpie = _clone(pie)
  curpie.label.position = 'outside'
  delete curpie.itemStyle.color
  const data = {
   uuid: '',
   type: 'pieChart',
   fields: _clone(fields),
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 4,
    h: 8
   },
   common: { pie: curpie },
   option: {
    color: _clone(color),
    toolbox: _clone(toolbox),
    tooltip: { show: true, trigger: 'item' },
    grid: _clone(grid),
    legend: _clone(legend),
    series: []
   }
  }

  return _clone(data)
 },
 createScatter: function () {
  const curscatter = _clone(scatter)

  const data = {
   uuid: '',
   type: 'scatterChart',
   fields: {
    dimension: [
     [
      dimensions[1]
     ]
    ],
    measure: [
     [{ ...measures[0], operator: 'detailed' }], [{ ...measures[1], operator: 'detailed' }], [{ ...dimensions[2], operator: 'detailed' }]
    ],
    filter: []
   },
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 4,
    h: 8
   },
   common: { scatter: curscatter },
   option: {
    color: _clone(color),
    toolbox: _clone(toolbox),
    tooltip: { show: true, trigger: 'item' },
    grid: _clone(grid),
    legend: _clone(legend),
    xAxis: [{ ..._clone(axis), type: 'value' }],
    yAxis: [{ ..._clone(axis), type: 'value' }],
    series: []
   }
  }

  return _clone(data)
 },
 createTable () {
  const curTable = _clone(table)

  const data = {
   uuid: '',
   type: 'tableChart',
   fields: {
    dimension: [
     [
      dimensions[1]
     ]
    ],
    measure: [
     [{ ...measures[0], operator: 'detailed' }, { ...measures[1], operator: 'detailed' }, { ...dimensions[2], operator: 'detailed' }]
    ],
    filter: []
   },
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 4,
    h: 8
   },
   option: {
    series: [curTable],
   }
  }

  return _clone(data)
 },
 createCandlestick: function () {
  const curcandlestick = _clone(candlestick)
  const data = {
   type: 'candlestickChart',
   fields: {
    dimension: [
     [
      dimensions[1]
     ]
    ],
    measure: [
     [{ ...measures[0], operator: 'detailed' }, { ...measures[1], operator: 'detailed' }, { ...dimensions[2], operator: 'detailed' }]
    ],
    filter: []
   },
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 8,
    h: 6
   },
   common: { candlestick: curcandlestick },
   option: {
    toolbox: _clone(toolbox),
    tooltip: { show: true, trigger: 'axis' },
    grid: _clone(grid),
    legend: _clone(legend),
    xAxis: [_clone(axis)],
    yAxis: [_clone(axis)],
    series: []
   }
  }
  data.option['xAxis'][0].splitLine.show = false
  return _clone(data)
 },
 createRadar: function () {
  const curradar = _clone(radar)
  const data = {
   id: '1',
   type: 'radarChart',
   fields: _clone(fields),
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 8,
    h: 6
   },
   common: { radar: curradar },
   option: {
    toolbox: _clone(toolbox),
    color: _clone(color),
    tooltip: { show: true, trigger: 'axis' },
    grid: _clone(grid),
    legend: _clone(legend),
    radar: [
     {
      indicator: [

      ],
      shape: 'polygon',
      center: ['50%', '50%'],
      radius: ' 75%',
      startAngle: 90,
     }],
    series: []
   }
  }
  return _clone(data)
 },
 createMap: function () {
  const data = {
   uuid: '',
   type: 'mapChart',
   fields: _clone(fields),
   dataset: _clone(dataset),
   title: _clone(title),
   position: {
    x: 0,
    y: 0,
    w: 8,
    h: 6
   },
   common: { city: { adcode: '100000', name: 'china' } },
   option: {
    color: _clone(color),
    toolbox: _clone(toolbox),
    tooltip: { show: true, trigger: 'axis' },
    grid: _clone(grid),
    legend: _clone(legend),
    geo: _clone(geo),
    visualMap: _clone(visualMap),
    series: []
   }
  }
  return _clone(data)
 }
}
