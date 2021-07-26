<template>
  <div class='chart-frame flex'>
    <div ref="chart"
         class="chart-canvas"></div>
  </div>

</template>
<script>
import * as echarts from 'echarts'
import mixin from './mixin.js'
import { _clone, _concat, _arrToobject } from '@/utils/util'
import vm from '@/event.js'
export default {
  mixins: [mixin],
  props: {

  },
  data () {
    return {
      data: this.$attrs['data'],
      chart: ''
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
      debugger
    },
    async init () {
      if (!this.dataset || !this.dataset.uuid) {
        this.renderChart(this.option)
        return
      }
      const { data, dimension, measure } = await this.getData()
      const { axis, dimensionVal, seriesData, seriesName, seriesOrign } = this.analysis(data, dimension, measure)
      this.createChart(axis, dimensionVal, seriesData, seriesName, seriesOrign)
    },

    resizeChart () {
      if (this.chart) {
        setTimeout(() => {
          this.chart.resize()
        })

      }
    },
    createChart (axis, dimensionVal, seriesData, seriesName, seriesOrign) {
      const option = this.option
      //设置option轴
      this.setAxis(axis, option)

      const colors = this.common.color ? _clone(this.common.color) : _clone(this.option.color)
      option.color = colors

      option.legend.data = seriesName
      const oldseries = _clone(option.series)
      let series = []
      for (let i = 0; i < seriesName.length; i++) {
        let serie = oldseries[i]
        if (!serie) {
          serie = _clone(this.common['candlestick'])
          let color = colors[i % colors.length]
          serie.itemStyle.color = color
        }
        serie.name = seriesName[i]
        serie.data = seriesData[i]
        series.push(serie)
      }
      option.series = series
      vm.$emit('setOption_' + this.data.uuid, { key: 'option', data: option })
      this.renderChart(option)
    },
    renderChart (option) {
      const _self = this
      setTimeout(() => {
        if (!_self.chart) {
          _self.chart = echarts.init(_self.$refs.chart, 'macarons')
          _self.chart.on('click', function (params) {
            _self.addTest()
          })
        }
        _self.chart.clear()
        _self.chart.setOption(option, true)
      })
    }
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
</style>
