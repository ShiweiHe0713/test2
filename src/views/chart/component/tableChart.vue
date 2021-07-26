<template>
  <div class='chart-frame flex'>
    <div ref="chart"
         class="chart-canvas"
         style=''>
      <a-table v-if='refresh'
               :columns="columns"
               :data-source="dataTable"
               :row-key="(record,index) => index"
               :pagination="pagination"
               @change="handleTableChange"
               :scroll="scroll">
        <template v-for='(item,indexField) in columns'>
          <a :slot="item.scopedSlots.customRender"
             slot-scope="text, record"
             :key='indexField+"_col"'>{{ record[item['dataIndex']] }}</a>
        </template>
      </a-table>
    </div>
  </div>

</template>
<script>

import mixin from './mixin.js'

import vm from '@/event.js'
export default {
  mixins: [mixin],
  props: {
  },
  data () {
    return {
      refresh: true,
      data: this.$attrs['data'],
      columns: [],
      dataTable: [],
      chart: '',
      datasetOption: [],
      seriesIndex: [],
      pagination: { pageSize: 10, current: 1, total: 0 },
      tableField: [],
      scroll: {},
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
    getRect () {
      let position = this.$refs['chart'].getBoundingClientRect()
      this.scroll.x = position.width
      this.scroll.y = this.option.table && this.option.table.page ? (position.height - 70) : (position.height - 70 - 32)
    },
    handleTableChange (pagination, filters, sorter) {

      this.pagination = pagination
      this.init(true)
    },
    async init () {
      const { data, dimension, measure } = await this.getData(this.pagination)
      this.getRect()
      this.tableField = [...dimension, ...measure]
      this.dataTable = data
      this.renderChart(this.option)
    },

    resizeChart () {
      this.refresh = false
      setTimeout(() => {
        this.getRect()
        this.renderChart(this.option)
        this.refresh = true
      })

    },
    getStyle (heat, value) {
      let style = {}
      let distance = (heat.range[1] - heat.range[0]) / 10
      for (let i = 0; i < 10; i++) {
        if (Number(value) >= (heat.range[0] + i * distance) && Number(value) < (heat.range[0] + (i + 1) * distance)) {
          style = { 'background-color': heat.colors[i] }
          break
        }
      }
      return style
    },
    analysisScattar (oldOption) {
      let config = this.option.series[0]
      let tableField = this.tableField

      let title = []
      for (let i = 0; i < tableField.length; i++) {
        title.push({
          title: tableField[i].alias,
          dataIndex: tableField[i].col,
          key: tableField[i].col,
          customRender: (text, row, index) => {
            let style = {}
            if (config.heat.show) {
              style = this.getStyle(config.heat, text)
            }
            return {
              children: text,
              style,
            }
          }
        })
      }
      if (config.isSeries) {
        title.unshift({
          title: '序号',
          customRender: (t, r, index) => {
            return (this.pagination.current - 1) * this.pagination.pageSize + parseInt(index) + 1
          }
        })
      }
      this.columns = title
    },

    renderChart (option) {
      const _self = this
      let cloneOption = _self.analysisScattar(option)
    }
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
</style>
