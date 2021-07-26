<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1"
                  tab="常用">
        <template v-if="!noBase.includes(option.type)">
          <component :is="option.type+'Base'"
                     :option="option"
                     v-bind="$attrs"
                     :type='type' />
        </template>
        <item-style :option="option.itemStyle"
                    v-if="option.itemStyle!==undefined"></item-style>
      </a-tab-pane>
      <a-tab-pane key="2"
                  tab="标签"
                  v-if="option.label!==undefined">
        <label-style :option="option.label"></label-style>
      </a-tab-pane>
      <template v-if="type != 'all' ">
        <a-tab-pane key="4"
                    tab="线"
                    v-if="option.lineStyle!==undefined">
          <line-style :option="option.lineStyle"></line-style>
        </a-tab-pane>
        <a-tab-pane key="5"
                    tab="区域"
                    v-if="option.areaStyle!==undefined">
          <area-style :option="option.areaStyle"></area-style>
        </a-tab-pane>
      </template>

    </a-tabs>
  </div>
</template>
<script>
import colorGroup from './colorGroup'
import lineBase from './base/line'
import barBase from './base/bar'
import pieBase from './base/pie'
import scatterBase from './base/scatter'
import tableBase from './base/table'
import mapBase from './base/map'
import lineStyle from './lineStyle'
import labelStyle from './labelStyle'
import itemStyle from './itemStyle'
import areaStyle from './areaStyle'
import { _clone, _getDiff, _debounce } from '@/utils/util'
export default {
  components: {
    lineBase,
    barBase,
    pieBase,
    tableBase,
    scatterBase,
    lineStyle,
    labelStyle,
    areaStyle,
    itemStyle,
    colorGroup,
    mapBase
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {},
    series: {},
  },
  watch: {
    option: {
      handler (val, oldVal) {
        this.getDiff(val, oldVal, this.type, this.oldOption)
      },
      deep: true,
    },

  },
  created () {

    if (this.type == 'all') {
      this.oldOption = _clone(this.option)
    }
  },
  data () {
    return {
      activeKey: ['1'],
      oldOption: {},
      noBase: ['table', 'candlestick']

    }
  },
  methods: {
    getDiff: _debounce(function (val, oldVal, type, oldOption) {
      if (type == 'all') {
        let diff = { key: '', value: '' }
        _getDiff(val, oldOption, diff, "")
        if (diff.key) {
          if (val.type == 'scatter' && diff.key.indexOf('additional') >= 0) return
          this.updateChart(diff.key.split("-"), diff.value)
        }
      }
    }),
    updateChart (diff, val) {
      for (let i = 0; i < this.series.length; i++) {
        let serie = this.series[i]
        for (let j = 0; j < diff.length; j++) {
          if (j == diff.length - 1) {
            serie[diff[j]] = val
          } else {
            serie = serie[diff[j]]
          }
        }
      }
      this.oldOption = _clone(this.option)
    },
    setDiffValue (arr, val, series) {

    }
  }
}
</script>
<style lang="less" scoped>
.series-name {
  color: rgba(0, 0, 0, 0.85);
}
</style>