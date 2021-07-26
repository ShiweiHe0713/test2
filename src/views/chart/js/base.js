const label = {
 show: false,
 position: 'top',
 distance: 5,
 rotate: 0,
 color: '#525A66',
 fontStyle: 'normal',
 fontWeight: 'normal',
 fontFamily: 'sans-serif',
 fontSize: 12,
 align: '',
 verticalAlign: ''
}
const itemStyle = {
 color: '#525A66',
 borderColor: '#525A66',
 borderWidth: 0,
 borderType: 'solid',
 shadowBlur: 0,
 shadowColor: '',
 shadowOffsetX: 0,
 shadowOffsetY: 0,
 opacity: 1
}
const lineStyle = {
 color: '',
 width: 2,
 type: 'solid',
 shadowBlur: 0,
 shadowColor: '',
 shadowOffsetX: 0,
 shadowOffsetY: 0,
 opacity: 1
}
const areaStyle = {
 color: '',
 origin: 'auto',
 shadowBlur: 0,
 shadowColor: '',
 shadowOffsetX: 0,
 shadowOffsetY: 0,
 opacity: 1
}
const title = {
 show: true,
 name: '',
 remarks: '',
 background: '#d9d9d9',
 border: 1,
 color: 'rgba(0, 0, 0, 0.65)'
}
const legend = {
 type: 'scroll',
 show: true,
 bottom: 0,
 pageIconColor: '#3d88f6',
 pageIconInactiveColor: '#d9d9d9',
 icon: 'circle',
 itemWidth: 10,
 itemHeight: 10,
 itemGap: 24,
 textStyle: {
  color: '#242A33',
  fontSize: 11,
  fontFamily: 'PingFangSC-Medium,PingFang SC',
  fontWeight: 500
 }
}
const grid = {
 "left": '5%',
 "right": "3%",
 "bottom": '50',
 "top": "3%"
}
const axis = {
 show: true,
 position: 'left',
 type: 'category',
 name: '',
 nameLocation: 'end',
 nameGap: 15,
 nameRotate: 0,
 inverse: false,
 boundaryGap: false,
 nameTextStyle: {
  color: '#333',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12
 },
 axisLine: {
  show: true,
  lineStyle: {
   color: '#525A66',
   width: 1,
   type: 'solid',
   shadowBlur: 0,
   shadowColor: '#525A66',
   shadowOffsetX: 0,
   shadowOffsetY: 0,
   opacity: 1
  }
 },
 axisTick: {
  show: true,
  length: 5,
  inside: false,
  lineStyle: {
   color: '#525A66',
   width: 1,
   type: 'solid',
   shadowBlur: 0,
   shadowColor: '#525A66',
   shadowOffsetX: 0,
   shadowOffsetY: 0,
   opacity: 1
  }
 },
 axisLabel: {
  show: true,
  interval: 'auto',
  inside: false,
  rotate: 0,
  margin: 8,
  color: '#525A66',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12
 },
 splitLine: {
  show: true,
  lineStyle: {
   color: '#eee',
   width: 1,
   type: 'dotted',
   shadowBlur: 0,
   shadowColor: '#eee',
   shadowOffsetX: 0,
   shadowOffsetY: 0,
   opacity: 1
  }
 },
 splitArea: {
  show: false,
  areaStyle: {
   color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
   shadowBlur: 0,
   shadowColor: '',
   shadowOffsetX: 0,
   shadowOffsetY: 0,
   opacity: 1
  }
 }
}
const line = {
 name: '折线',
 type: 'line',
 symbol: 'circle',
 symbolSize: 4,
 symbolRotate: 0,
 symbolKeepAspect: false,
 symbolOffset: [0, 0],
 showSymbol: true,
 showAllSymbol: 'auto',
 hoverAnimation: true,
 legendHoverLink: true,
 stack: false,
 clip: true,
 step: false,
 smooth: false,
 label: { ...label, show: true },
 itemStyle: { ...itemStyle },
 lineStyle: { ...lineStyle },
 /**areaStyle: { ...areaStyle }*/
}
const bar = {
 type: 'bar',
 name: '柱图',
 roundCap: false,
 label: { ...label, show: true },
 itemStyle: { ...itemStyle },
 stack: false,
 barWidth: '',
 barGap: '30%'
}
const pie = {
 type: 'pie',
 name: '饼图',
 selectedMode: false,
 clockwise: false,
 startAngle: 90,
 roseType: false,
 radius: [0, '75%'],
 label: { ...label },
 itemStyle: { ...itemStyle },
}
const scatter = {
 name: '散点',
 type: 'scatter',
 symbol: 'circle',
 symbolSize: 10,
 additional: {//外参数
  type: 'scatter',//参数组件
  overall: 'all',//是否全局
  visualMap: {
   show: false,
   dimension: -1,
   min: 0,
   max: 2000000,
   seriesIndex: [],
   inRange: {
    symbolSize: [10, 20]
   }
  },
  regression: {
   show: true,
   singleLine: true,
   type: 'exponential',//exponential linear  logarithmic polynomial
  }
 },
 label: { ...label },
 itemStyle: { ...itemStyle }
}
const table = {
 type: 'table',
 name: '表格',
 heat: {
  show: true,
  range: [0, 100],
  colors: [
   '#F5F9FF',
   '#ECF3FE',
   '#E2EDFE',
   '#D8E7FD',
   '#CEE1FD',
   '#C5DBFC',
   '#BBD5FC',
   '#B1CFFB',
   '#A8C9FB',
   '#9EC3FA',
  ]
 },
 isSeries: true,
 freeze: ['', ''],
}
const candlestick = {
 type: 'candlestick',
 name: 'K线',
 itemStyle: {
  color: '#c23531',
  color0: '#314656',
  borderColor: '#c23531',
  borderColor0: '#314656',
  borderWidth: 1,
  shadowBlur: '',
  shadowColor: '',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 1
 },
}
const radar = {
 name: '雷达',
 type: 'radar',
 symbol: 'circle',
 symbolSize: 4,
 symbolRotate: 0,
 indicator: [0, 100],
 label: { ...label, show: true },
 itemStyle: { ...itemStyle },
 lineStyle: { ...lineStyle },
 areaStyle: { ...areaStyle }
}
const toolbox = {
 show: false,
 feature: {
  dataZoom: {
   yAxisIndex: 'none'
  },
  dataView: { readOnly: false },
  saveAsImage: {}
 }
}
const color = [
 '#58CB74',
 '#48A1FF',
 '#FCD44B',
 '#9C67E6',
 '#4B588E',
 '#4DCCCB',
 '#FFA24A',
 '#3F7FE3',
 '#72DFFE',
 '#C967E6',
 '#C6F75F',
 '#A47E7C',
 '#81699B',
 '#7FBB2E',
 '#FF74B7',
 '#65E2B5',
 '#B09060',
 '#E36D74',
 '#5CCE7C',
 '#74ABFF',
]
const geo = {
 show: true,
 map: '',
 roam: false,
 center: '',
 aspectScale: 0.75,
 boundingCoords: '',
 zoom: 1,
 nameMap: '',
 label: { ...label },
 itemStyle: { ...itemStyle }
}
const map = {
 type: 'map',
 map: '',
 roam: false,
 zoom: 1,
 nameMap: '',
 label: { ...label },
 itemStyle: { ...itemStyle }
}
const visualMap = {
 show: true,
 min: 0,
 max: 500,
 left: 'left',
 top: 'bottom',
 text: ['高', '低'], // 文本，默认为数值文本
 calculable: true,
 seriesIndex: [1],
 inRange: {
  color: ['#3B5077', '#031525', '#ffc0cb', '#800080'] // 蓝黑
 }
}
const effectScatter = {
 type: 'effectScatter',
 legendHoverLink: true,
 effectType: 'ripple',
 showEffectOn: 'render',
 rippleEffect: {
  color: '',
  period: 4,
  scale: 2.5,
  brushType: 'fill',
 },
 coordinateSystem: 'cartesian2d',

 geoIndex: 0,
 calendarIndex: 0,
 symbol: 'circle',
 symbolSizeArray: [10, 10],
 label: { ...label },
 itemStyle: { ...itemStyle }
}
export {
 title,
 color,
 grid,
 legend,
 axis,
 line,
 label,
 bar,
 pie,
 scatter,
 table,
 candlestick,
 radar,
 toolbox,
 geo,
 map,
 visualMap,
 effectScatter
}
