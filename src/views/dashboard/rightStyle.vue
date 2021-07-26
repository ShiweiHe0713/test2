<template>
  <div>
    <a-tabs type="card"
            default-active-key="dataset">
      <a-tab-pane key="dataset"
                  tab="数据">
        <data-set v-if="dataset&&fields&&chartData"
                  :dataset="dataset"
                  :fields="fields"
                  :common='common'
                  :type="chartData.type"
                  v-bind="$attrs"></data-set>
      </a-tab-pane>
      <a-tab-pane key="style"
                  tab="样式">
        <div class="flex-column"
             v-if='colorList&&colorList.length>0'>
          <div class="flex-center-left"><span>颜色快速设置：</span></div>
          <div class="flex-row "
               style='flex-flow: wrap;'>

            <div class=""
                 v-for="(item,indexColor) in colorList"
                 :key="indexColor+'_list_chart'">
              <color-group v-model="colorList[indexColor]"
                           :index='indexColor'
                           @changeColor='changeColor'
                           size="small" />
            </div>
          </div>
        </div>
        <series-style :chartData="chartData"
                      :option="option"
                      v-bind="$attrs"></series-style>
      </a-tab-pane>
      <template slot="tabBarExtraContent"
                v-if='false'>
        <div class="flex-row flex-center">
          <span>编辑中：</span>
          <a-select v-model='chartId'
                    style="width: 120px"
                    size='small'
                    @change="changeEditChart">
            <a-select-option :value="item.uuid"
                             v-for='(item,index) in chartList'
                             :key='index+"_curChart"'>
              {{item.title.name}}
            </a-select-option>

          </a-select>
        </div>
      </template>
    </a-tabs>
  </div>
</template>
<script>
import colorGroup from '@/views/chart/common/colorGroup'
import { mapState } from 'vuex'
import vm from '@/event.js'
import { _debounce } from '@/utils/util'
import SeriesStyle from '@/views/chart/common/index'
import DataSet from '@/views/chart/dataset/index'
import { _diffArr } from '@/utils/util'
export default {
  components: {
    SeriesStyle,
    DataSet,
    colorGroup
  },
  props: {
    chartList: {
      type: Array,
      default: () => {
        return []
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data () {
    return {
      chartId: "",
      isChange: true,
      option: {},
      dataset: {},
      fields: {},
      common: {},
      title: {},
      colorList: this.chartData.option.color ? JSON.parse(JSON.stringify(this.chartData.option.color)) : [],
      additional: this.chartData.common.scatter ? this.chartData.common.scatter : {}
    }
  },
  watch: {
    'chartData.option': {
      handler (val, oldVal) {
        if (this.chartId && this.isChange) {
          this.resizeChart(this.chartId, val)
        }
      },
      deep: true,
      //immediate: false
    },
    'additional': {
      handler (val, oldVal) {
        if (this.chartId && this.isChange) {
          this.resizeChart(this.chartId, this.common, 'common')
        }
      },
      deep: true,
      //immediate: false
    },
    title: {
      handler (val, oldVal) {
        if (this.chartId && this.isChange) {
          this.resizeTitle(this.chartId, val)
        }
      },
      deep: true,
      //immediate: false
    },
    colorList: {
      handler (val, oldVal) {
      },
      deep: true,
    }
  },
  computed: {
    ...mapState({
      //chartId: state => state.chart.id
    })
  },
  created () {

    this.isChange = false
    if (this.chartData) {
      if (!this.chartId) {
        this.chartId = this.chartData.uuid
      }
      const obj = this.chartData
      this.option = obj.option
      this.dataset = obj.dataset
      this.fields = obj.fields
      this.common = obj.common
      this.title = obj.title
      vm.$off('setOption_' + this.chartData.uuid)
      vm.$on('setOption_' + this.chartData.uuid, (obj) => {
        this.setOption(obj)
      })
    }

    setTimeout(() => {
      this.isChange = true
    })
  },
  mounted () {

  },
  methods: {
    resizeTitle: _debounce((chartId, val) => {
      vm.$emit(chartId + '_change', { key: 'title', data: val })
    }, 500),
    resizeChart: _debounce((chartId, val, key) => {
      vm.$emit(chartId + '_change', { key: key ? key : 'option', data: val })
    }, 500),
    changeLine () {
      this.option.series[0].lineStyle.color = Math.random() > 0.5 ? 'red' : 'blue'
      // this.$store.commit('SET_CHART_OPTION', this.option)
    },
    changeColor ({ index, color }) {
      this.option.color[index] = color
      let serie = this.option.series[index]
      if (serie) {
        if (serie.type == 'line') {
          serie.lineStyle.color = color
          serie.itemStyle.color = color
          if (serie.areaStyle) {
            serie.areaStyle.color = color
          }
        } else if (serie.type == 'bar') {
          serie.itemStyle.color = color
        }
      }
    },
    setOption (obj) {
      this.isChange = obj.isChange
      if (obj.key) {
        this[obj.key] = obj.data
      } else {
        this.chartData = obj.data
        this.option = obj.data.option
        this.dataset = obj.data.dataset
        this.fields = obj.data.fields
        this.common = obj.data.common
      }
      setTimeout(() => {
        this.isChange = true
      })
    },
    changeEditChart (e) {
      vm.$emit('change-dashboard-method', { method: 'editChart', params: { id: this.chartId } })
    },
  },
  beforeDestroy () {
    vm.$off('setOption_' + this.chartData.uuid)
  }
}
</script>
<style lang="less" scoped>
</style>
