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
      let pieData = []
      for (let i = 0; i < data.length; i++) {
        let name = dimension && dimension.length == 1 ? data[i][dimension[0]['col']] : ''
        for (let j = 0; j < measure.length; j++) {
          pieData.push({ value: data[i][measure[j]['col']], name: name + '-' + measure[j]['alias'] })
        }
      }
      this.createChart(pieData)
    },
    resizeChart () {
      if (this.chart) {
        setTimeout(() => {
          this.chart.resize()
        })

      }
    },
    createChart (data) {
      const option = this.option
      const colors = this.common.color ? _clone(this.common.color) : _clone(this.option.color)
      option.color = colors
      let serie = option.series && option.series.length > 0 ? option.series[0] : _clone(this.common['pie'])
      serie.data = data
      option.series = [serie]
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
