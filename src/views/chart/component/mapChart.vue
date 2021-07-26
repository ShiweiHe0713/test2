<template>
  <div class='chart-frame flex'>
    <div ref="chart"
         class="chart-canvas"></div>
  </div>

</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
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
      chart: '',
      oldseries: [],
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
    async init () {
      let city = this.common.city
      if (!city || !city.adcode) return
      axios.get(`https://geo.datav.aliyun.com/areas_v2/bound/${city.adcode}_full.json`, geoJson => {
        echarts.registerMap(city.name, geoJson);
        if (!this.dataset || !this.dataset.uuid) {
          this.renderChart(this.option)
          return
        }
        const { data, dimension, measure } = this.getData()
        let field = dimension.concat(measure)
      })


    },

    resizeChart () {
      if (this.chart) {
        setTimeout(() => {
          this.chart.resize()
        })

      }
    },
    createChart (field, data) {
      const option = this.option
      let visualMap = option.visualMap
      let series = []
      for (let i = 0; i < field.length; i++) {

        let serie = ''
        if (this.oldseries && this.oldseries.length > 0) {
          const { index } = _getArrayIndex(this.oldseries, 'type', field[i].seriesType)
          if (index >= 0) {
            serie = this.oldseries[i]

          }
        }
        if (!serie) {
          if (seriesOrign[i]?.measure?.seriesType) {
            serie = _clone(this.seriesList[seriesOrign[i].measure.seriesType])
          }
        }

        serie.data = data[i]
        series.push(serie)
      }
      option.series = series
      vm.$emit('setOption_' + this.data.uuid, { key: 'option', data: option })
      this.renderChart(option)
    },
    renderChart (option) {
      const _self = this
      this.oldseries = _clone(this.option.series)
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
