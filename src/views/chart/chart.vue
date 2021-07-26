<template>
  <div class="chart-content flex-column">
    <div class="chart-header"
         v-if="title.show"
         :style="{color:title.color}">

      <chart-header :title='title'
                    v-bind="$attrs">
      </chart-header>
    </div>
    <component :is="data.type"
               ref="chartComponent"
               v-bind="$attrs" />
  </div>
</template>
<script>
import lineChart from './component/lineChart'
import barChart from './component/barChart'
import pieChart from './component/pieChart'
import scatterChart from './component/scatterChart'
import tableChart from './component/tableChart'
import chartHeader from './component/chartHeader'
import customChart from './component/customChart'
import mapChart from './component/mapChart'
export default {
  components: {
    chartHeader,
    lineChart,
    barChart,
    pieChart,
    scatterChart,
    tableChart,
    customChart,
    mapChart
  },
  props: {

  },
  watch: {
  },
  data () {
    return {
      data: this.$attrs['data'],
      title: {
        show: true,
        name: '',
        remarks: '',
      }
    }
  },
  mounted () {

  },
  created () {
    this.title = this.data.title
  },

  beforeDestroy () {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.chart-content {
  position: relative;
  height: 100%;
  width: 100%;
  .chart-header {
    height: 45px;
  }
}
</style>
