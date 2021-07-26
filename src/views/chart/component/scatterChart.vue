<template>
  <div class='chart-frame flex'>
    <div ref="chart"
         class="chart-canvas"></div>
  </div>

</template>
<script>
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'

import mixin from './mixin.js'
import { _clone, _concat, _arrToobject } from '@/utils/util'
echarts.registerTransform(ecStat.transform.regression);
import vm from '@/event.js'
export default {
  mixins: [mixin],
  props: {
  },
  data () {
    return {
      data: this.$attrs['data'],
      chart: '',
      datasetOption: [],
      seriesIndex: []
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    this.init()
  },
  mounted () {

  },
  methods: {
    test () {

    },
    async init () {
      if (!this.dataset || !this.dataset.uuid) {
        this.renderChart(this.option)
        return
      }
      const { data, dimension, measure } = await this.getData()
      let source = []
      let seriesName = []
      let max = 0
      let min = 0
      for (let i = 0; i < data.length; i++) {
        source[i] = []
        for (let j = 0; j < measure.length; j++) {
          let curValue = data[i][measure[j]['col']]
          if (max <= curValue) {
            max = curValue
          }
          if (min >= curValue) {
            min = curValue
          }
          source[i].push()
        }
        if (dimension && dimension.length > 0) {
          for (let z = dimension.length - 1; z >= 0; z--) {
            source[i].push(data[i][dimension[z]['col']])
            if (z == 0) {
              if (!seriesName.includes(data[i][dimension[z]['col']])) {
                seriesName.push(data[i][dimension[z]['col']])
              }
            }
          }
        }
      }
      this.common.scatter.additional.visualMap.inRange.symbolSize = [min, max]
      this.createChart(source, seriesName, dimension, measure)
    },
    resizeChart () {
      if (this.chart) {
        setTimeout(() => {
          this.chart.resize()
        })

      }
    },
    createChart (source, seriesName, dimension, measure) {
      debugger
      if (seriesName.length == 0) {
        seriesName = ['']
      }
      let dataset = [{ source: source }]
      let transform = []
      let seriesIndex = []
      const option = this.option
      const colors = this.common.color ? _clone(this.common.color) : _clone(this.option.color)
      option.color = colors

      option.legend.data = seriesName
      const oldseries = _clone(option.series)
      let series = []

      for (let i = 0; i < seriesName.length; i++) {
        if (seriesName[i]) {
          if (dimension.length >= 1) {
            transform.push({
              transform: {
                type: 'filter',
                config: { dimension: measure.length, eq: seriesName[i] }
              }
            })
          }
        }
        seriesIndex.push(i)
        let serie = oldseries[i]
        if (!serie) {
          serie = _clone(this.common['scatter'])
          delete serie.additional
          let color = colors[i % colors.length]
          serie.itemStyle.color = color
        }
        serie.name = seriesName[i]
        serie.datasetIndex = i + 1
        series.push(serie)
      }
      if (transform.length > 0) {
        dataset.push(...transform)
      }
      option.series = series
      vm.$emit('setOption_' + this.data.uuid, { key: 'option', data: option })
      this.datasetOption = _clone(dataset)
      this.seriesIndex = _clone(seriesIndex)
      this.renderChart(option)
    },
    analysisScattar (oldOption) {
      let dataset = _clone(this.datasetOption)
      let seriesIndex = _clone(this.seriesIndex)
      let option = _clone(oldOption)
      let scattar = _clone(this.common['scatter'])
      let additional = scattar.additional
      let visualMap = additional.visualMap
      let measure = this.$attrs['data']['fields']['measure']
      if (measure.length == 3) {
        visualMap.dimension = 2
      }
      visualMap.seriesIndex = seriesIndex
      option.visualMap = visualMap
      let regression = additional.regression
      if (regression.show) {
        dataset.push({
          transform: {
            type: 'ecStat:regression',
            config: {
              method: regression.type
            }
          }
        })
        let lineNum = regression.singleLine ? 1 : option.series.length
        for (let i = 1; i <= lineNum; i++) {
          let line = {
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: regression.singleLine ? (dataset.length) : i,
            symbolSize: 0.1,
            symbol: 'circle',
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 }
          }
          option.series.push(line)
        }

      }
      option.dataset = dataset
      return option
    },

    renderChart (option) {
      const _self = this
      let cloneOption = _self.analysisScattar(option)
      setTimeout(() => {
        if (!_self.chart) {
          _self.chart = echarts.init(_self.$refs.chart, 'macarons')
          _self.chart.on('click', function (params) {
            _self.addTest()
          })
        }
        _self.chart.clear()
        _self.chart.setOption(cloneOption, true)
      })
    }
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
</style>
