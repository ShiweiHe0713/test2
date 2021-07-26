<template>
  <div>
    <a-tabs default-active-key="base">
      <a-tab-pane key="base"
                  tab="基础">
        <base-style :option="option"
                    v-bind="$attrs"></base-style>
      </a-tab-pane>
      <a-tab-pane key="xAxis"
                  tab="X轴"
                  v-if="option.xAxis&&option.xAxis[0]">
        <axis-style :option="option.xAxis[0]"
                    axisType="x"></axis-style>
      </a-tab-pane>
      <a-tab-pane key="yAxis"
                  tab="Y轴"
                  v-if="option.yAxis&&option.yAxis[0]">
        <axis-style :option="option.yAxis[0]"
                    axisType="y"></axis-style>
      </a-tab-pane>
      <a-tab-pane key="style"
                  tab="图表">
        <div class="flex-column"
             v-if='false'>
          <div class="flex-center-left"><span>颜色快速设置：</span></div>
          <div class="flex-row "
               style='flex-flow: wrap;'>

            <div class=""
                 v-for="(color,indexColor) in colorList"
                 :key="indexColor+'_list_chart'">
              <color-group v-model="colorList[indexColor]"
                           size="small" />
            </div>
          </div>
        </div>
        <a-collapse accordion>
          <template v-if="false">
            <template v-for="(serie,key) in common">
              <a-collapse-panel v-if="key!='pie'&&key!='candlestick'"
                                :key="key+'_chart'">
                <template slot="header">
                  <span>
                    {{'全局设置_'+key}}
                    <a-tooltip>
                      <template slot="title">
                        <span>当前修改会影响当前所有图像样式，如果有特殊需求请修改完后在进行明细修改</span>
                      </template>
                      <a-icon type="info-circle" />
                    </a-tooltip>
                  </span>
                </template>
                <series-style :option="serie"
                              :type="'all'"
                              :radar='option.radar'
                              :series='option.series'></series-style>
              </a-collapse-panel>
            </template>
          </template>
          <template v-for="(series,index) in option.series">
            <a-collapse-panel :key="index+'_series'"
                              :header="series.name">
              <series-style :option="series"></series-style>
            </a-collapse-panel>
          </template>

        </a-collapse>

      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import SeriesStyle from './seriesStyle'
import BaseStyle from './baseStyle'
import AxisStyle from './axisStyle'
import { _diffArr } from '@/utils/util'
import colorGroup from './colorGroup'
export default {
  components: {
    SeriesStyle,
    BaseStyle,
    AxisStyle,
    colorGroup
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      common: this.$attrs['chartData'].common,
      colorList: JSON.parse(JSON.stringify(this.$attrs['chartData'].option.color))
    }
  },
  watch: {

  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  beforeDestroy () {

  }
}
</script>
<style lang="less" scoped>
</style>
