const jsonUrl = 'https://geo.datav.aliyun.com/areas_v2/bound/110000_full.json'
const mapUrl = 'https://geo.datav.aliyun.com/areas_v2/bound/all.json'
const filter = {
 name: '条件',
 selectAxis: '', // 是否可以选择x、y轴
 fields: 'filter',
 type: 'filter', // 可以接受字段类型，dimension，measure，all
 index: 0
}
const axis = {
 lineChart: [
  {
   name: '坐标',
   selectAxis: 'xAxis', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 1,
   max: 1
  },
  {
   name: '维度',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 1
  },
  {
   name: '指标',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   serieType: 'line',
   serieChange: true,
   index: 0,
   min: 1,
  },

 ],
 barChart: [
  {
   name: '坐标',
   selectAxis: 'xAxis', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 1,
   max: 1
  },
  {
   name: '维度',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 1
  },
  {
   name: '指标',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   serieType: 'bar',
   serieChange: true,
  },

 ],
 pieChart: [
  {
   name: '分类',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 0,
   max: 1
  },
  {
   name: '值',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   serieType: 'pie',
   serieChange: false,
  },

 ],
 scatterChart: [
  {
   name: '分类',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 0,
   max: 2
  },
  {
   name: '值(X轴)',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 1,
   max: 1,

  },
  {
   name: '值(Y轴)',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 1,
   min: 1,
   max: 1
  },
  {
   name: '散点值',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 2,
   min: 0,
   max: 1,
   serieType: 'scatter',
   serieChange: false,
  },

 ],
 tableChart: [
  {
   name: '指标',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: -1,
   max: -1
  },
  {
   name: '指标',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0
  },

 ],
 candlestickChart: [
  {
   name: '坐标',
   selectAxis: 'xAxis', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 1,
   max: 1
  },
  {
   name: 'K线',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 4,
   max: 4,
   serieType: 'candlestick',
   serieChange: false,
  },

 ],
 radarChart: [
  {
   name: '分类',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'dimension',
   type: 'dimension', // 可以接受字段类型，dimension，measure，all
   index: 0
  },
  {
   name: '值',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 1,
   serieType: 'radar',
   serieChange: false,
  },

 ],
 mapChart: [
  {
   name: '值',
   selectAxis: '', // 是否可以选择x、y轴
   fields: 'measure',
   type: 'measure', // 可以接受字段类型，dimension，measure，all
   index: 0,
   min: 3,
   serieType: 'map',
   serieChange: false,
  },

 ],
}
/**
 * 0 (dimension=1 and measure>1) or (dimension=2 and measure>1
 */
const validRule = [
 [
  {
   dimension: {
    operate: '>=',
    value: 1
   },
   measure: {
    operate: '>=',
    value: 1
   }
  }
 ]
]
const errorRule = [
 [
  {
   dimension: {
    operate: '<=',
    value: 0
   },
   error: '图形维度不能为空'
  }
 ]
]
const fieldRule = {
 lineChart: {
  valid: validRule[1]
 }
}
const axisChartList = [
 { label: '折线', value: 'line' },
 { label: '柱图', value: 'bar' },
]
export {
 axis,
 fieldRule,
 errorRule,
 axisChartList
}
