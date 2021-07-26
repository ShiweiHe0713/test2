import { sendHttp } from '@/api/interface'
import { getExcelData, getSqlFieldData } from '@/api/dataset'
import { _clone, _concat, _arrToobject, _merge, _debounce, _getArrayIndex } from '@/utils/util'
import vm from '@/event.js'
import { updateChart } from '@/api/chart'
import {
 line,
 bar,
 pie,
 scatter,
 table,
 candlestick,
 radar,
} from '@/views/chart/js/base'
import {
 axis
} from '@/views/chart/js/axis'
export default {
 data () {
  return {
   seriesList: {
    line,
    bar,
    pie,
    scatter,
    table,
    candlestick,
    radar,
   },
   chartId: this.$attrs['data']['uuid'],
   option: this.$attrs['data']['option'],
   dataset: this.$attrs['data']['dataset'],
   fields: this.$attrs['data']['fields'],
   common: this.$attrs['data']['common'],
   param: { headers: [{ name: '', value: '' }], transferKey: 'data', url: '', type: 'GET', data: [{ name: '', value: '' }, { name: '', value: '' }] }
  }
 },
 watch: {

 },
 created () {

 },
 mounted () {
  let self = this
  if (this.dataset.param) {
   this.dataset.param = JSON.parse(this.dataset.param)
  }
  if (this.chartId) {
   vm.$off('change-chart-' + self.chartId)
   vm.$on('change-chart-' + self.chartId, (data) => {

    self[data.method](data.param)
   })
   vm.$on(self.chartId + '_change', (data) => {
    if (data.key === 'option') {
     self.renderChart(data.data)
     this.updateChartOperator(['option'])
    } else if (data.key === 'dataset') {

     self.dataset = data.data.dataset
     self.fields = data.data.fields

     this.updateChartOperator(['dataset', 'fields'])
     self.init()
     //this.updateChartOperator(['dataset', 'fields'])
    } else if (data.key == 'title') {
     _merge(this.$attrs['data']['title'], data.data)
     this.updateChartOperator(['title'])
    } else if (data.key == 'fresh') {
     self.init()
    } else if (data.key == 'common') {
     this.common = data.data
     this.updateChartOperator(['common'])
     self.renderChart(this.option)
    }
   })
  }
 },
 beforeDestroy () {
  vm.$off(this.chartId + '_change')
 },
 methods: {
  arrayToObject (params) {
   const param = {}
   for (let i = 0; i < params.length; i++) {
    if (params[i].name) {
     param[params[i].name] = params[i].value
    }
   }
   return param
  },
  async getInterfaceData (datasetParam) {
   let data = []
   const param = this.arrayToObject(datasetParam.data)
   const headers = this.arrayToObject(datasetParam.headers)
   const sendParams = { ...datasetParam, data: param, headers: headers }
   let res = await sendHttp(sendParams)
   if (res) {
    const params = this.param
    if (params.transferKey) {
     const keys = params.transferKey.split('.')
     if (keys.length >= 0) {
      for (let i = 0; i < keys.length; i++) {
       res = res[keys[i]]
      }
      data = res
     }
    } else {
     data = res
    }

    return data
   }
   return []
  },
  getFields (fileds) {
   let arr = []
   for (let i = 0; i < fileds.length; i++) {
    arr.push(...fileds[i])
   }
   return arr
  },
  async getExcelDataFun (dimension, measure, page) {
   let res = await getExcelData({ dimension, measure, tableName: this.dataset.tableName, page, filter: [] })
   return res.data

  },
  async getData (page) {
   let data = []
   let dimension = this.getFields(this.fields['dimension'])
   let measure = this.getFields(this.fields['measure'])

   // api获取数据
   if (this.dataset.type === 'interface') {
    data = await this.getInterfaceData()
   } else if (this.dataset.type === 'excel') {
    data = await this.getExcelDataFun(dimension, measure, page)
   } else if (this.dataset.type === 'mysql') {
    let res = await getSqlFieldData({ dimension, measure, filter: [], uuid: this.dataset.uuid })
    data = res.data
   }
   return { data, dimension, measure }
  },
  analysis (data, dimensions, measures) {
   let axis = []//坐标轴
   let dimensionVal = []
   let seriesData = []
   let seriesName = []// 维度值+指标名称
   let seriesOrign = []//{dimension:uuid,dimensionVal:'',measure:uuid}
   let seriesOrignObj = {}//维度值：维度uuid
   let axisCol = dimensions[0]['col']
   for (let i = 0; i < data.length; i++) {
    let axisIndex = axis.indexOf(data[i][axisCol])
    if (axisIndex < 0) {
     axis.push(data[i][axisCol])
     axisIndex = axis.length - 1
    }
    let dimensionIndex = 0
    for (let j = 0; j < dimensions.length; j++) {
     if (axisCol && j == 0 && dimensions.length > 1) {
      continue
     }
     if (dimensions[j]['col'] != axisCol) {
      seriesOrignObj[data[i][dimensions[j]['col']]] = dimensions[j]['uuid']
      dimensionIndex = dimensionVal.indexOf(data[i][dimensions[j]['col']])
      if (dimensionIndex < 0) {
       dimensionVal.push(data[i][dimensions[j]['col']])
       dimensionIndex = dimensionVal.length - 1
      }

     }
     for (let z = 0; z < measures.length; z++) {

      let chartName = dimensionVal[dimensionIndex] ? (dimensionVal[dimensionIndex] + '-' + measures[z]['alias']) : measures[z]['alias']
      let seriesIndex = seriesName.indexOf(chartName)
      if (seriesIndex < 0) {
       seriesName.push(chartName)
       seriesOrign.push({
        dimension: seriesOrignObj[dimensionVal[dimensionIndex]],
        dimensionVal: dimensionVal[dimensionIndex],
        measure: measures[z]
       })
       seriesIndex = seriesName.length - 1
      }
      if (!seriesData[seriesIndex]) {
       seriesData[seriesIndex] = []
      }
      seriesData[seriesIndex][axisIndex] = data[i][measures[z]['col']]
     }
    }
   }
   return { axis, dimensionVal, seriesData, seriesName, seriesOrign, seriesOrignObj }
  },
  analysisData (data) {
   const option = this.option
   option.legend.data = []
   const series = _clone(option.series)
   const dimensions = _clone(_concat(this.fields.dimension))
   const measures = _clone(_concat(this.fields.measure))
   const color = this.common.color ? _clone(this.common.color) : _clone(this.option.color)
   option.color = color
   for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < dimensions.length; j++) {
     if (!dimensions[j].data) {
      dimensions[j].data = []
     }
     dimensions[j].data.push(data[i][dimensions[j].name])
     if (i === data.length - 1) {
      const axis = dimensions[j]['axis']
      let otherAxis = 'yAxis'
      if (axis === 'xAxis') {
       otherAxis = 'yAxis'
      } else {
       otherAxis = 'xAxis'
      }
      option[axis][0].type = 'category'
      option[axis][0].data = dimensions[j].data
      option[otherAxis][0].type = 'value'
      delete option[otherAxis][0].data
     }
    }
    for (let z = 0; z < measures.length; z++) {
     if (!measures[z].data) {
      measures[z].data = []
     }
     measures[z].data.push(data[i][measures[z].name])
     if (i === data.length - 1) {
      option.legend.data.push(measures[z].alias)
      if (!series[z]) {
       series[z] = _clone(this.common[measures[z]['axis']])
       series[z].lineStyle.color = color[i % color.length]
      }
      series[z].name = measures[z].alias
      series[z].data = measures[z].data
     }
    }
   }
   option.series = series
   vm.$emit('setOption_' + this.chartId, { key: 'option', data: option })
   return option
  },
  analysisMoreDimensionData (data) {

  },
  setAxis (axis, option) {
   const curAxis = this.fields.dimension[0][0]['axis']
   let otherAxis = 'yAxis'
   if (curAxis === 'xAxis') {
    otherAxis = 'yAxis'
   } else {
    otherAxis = 'xAxis'
   }
   option[curAxis][0].type = 'category'
   option[curAxis][0].data = axis
   option[otherAxis][0].type = 'value'
   delete option[otherAxis][0].data
  },
  updateChartOperator: _debounce(function (arr) {
   if (this.$attrs['data'].noUpdate) return
   let param = { uuid: this.chartId }
   for (let i = 0; i < arr.length; i++) {
    param[arr[i]] = JSON.stringify(this[arr[i]])
   }
   updateChart(param).then((res) => {

   })
  }, 2000),

  addTest () {
   this.option.legend.data.push('test')
   this.option.series[0].data.push(100)
   vm.$emit('setOption_' + this.chartId, { key: 'option', data: this.option })
   // this.$store.commit('SET_CHART_OPTION', this.option)
  }
 }
}
