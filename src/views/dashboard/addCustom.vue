<template>
  <div>
    <div>
      <a-button type="primary"
                @click="()=>{this.visible=true}"
                style="margin-top:15px">
        保存
      </a-button>
    </div>
    <div class="flex-row dashboard">

      <div class="left flex-column"
           style=" padding: 10px;">
        <a-textarea v-model="chartOption"
                    placeholder=""
                    :auto-size="{ minRows:50, maxRows: 30 }"
                    style="width:500px" />
      </div>
      <div class="flex-column">
        <a-select v-model="chartMoudle.type">
          <a-select-option :value="item.value"
                           v-for="(item,index) in chartTypeList"
                           :key="index+'_chart'">
            <span>{{item.label}}</span>
          </a-select-option>
        </a-select>
        <a-button type="primary"
                  style="margin-top:15px"
                  @click="changeChart(false)">
          转换
        </a-button>
        <a-button type="primary"
                  @click="changeChart(true)"
                  style="margin-top:15px">
          合并转换
        </a-button>

      </div>

      <div class="flex flex-column dashboard-content"
           ref="gridlayoutFrame">
        <template v-if='createChart'>
          <rightStyle style="width:350ppx"
                      :chartData="chart"
                      v-bind="$attrs"
                      :chartList='[chart]'></rightStyle>
          <div style="height:400px">
            <chart-compoent :data="chart"
                            :class="['chart-style']"></chart-compoent>
          </div>

        </template>
      </div>

    </div>

    <share-chart v-if='visible'
                 :visible.sync="visible"
                 :chart='chart'
                 @finishSave='finishSave'></share-chart>
  </div>
</template>

<script>
const test = {
  "backgroundColor": "#fff",
  "color": ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"],
  "title": {
    "text": "全国6月销售统计",
    "textStyle": {
      "fontSize": 12,
      "fontWeight": 400
    },
    "left": "center",
    "top": "5%"
  },
  "legend": {
    "icon": "circle",
    "top": "5%",
    "right": "5%",
    "itemWidth": 6,
    "itemGap": 20,
    "textStyle": {
      "color": "#556677"
    }
  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "label": {
        "show": true,
        "backgroundColor": "#fff",
        "color": "#556677",
        "borderColor": "rgba(0,0,0,0)",
        "shadowColor": "rgba(0,0,0,0)",
        "shadowOffsetY": 0
      },
      "lineStyle": {
        "width": 0
      }
    },
    "backgroundColor": "#fff",
    "textStyle": {
      "color": "#5c6c7c"
    },
    "padding": [10, 10],
    "extraCssText": "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)"
  },
  "grid": {
    "top": "15%"
  },
  "xAxis": [{
    "type": "category",
    "data": ["北京", "上海", "广州", "深圳", "香港", "澳门", "台湾"],
    "axisLine": {
      "lineStyle": {
        "color": "#DCE2E8"
      }
    },
    "axisTick": {
      "show": false
    },
    "axisLabel": {
      "interval": 0,
      "textStyle": {
        "color": "#556677"
      },
      "fontSize": 12,
      "margin": 15
    },
    "axisPointer": {
      "label": {
        "padding": [0, 0, 10, 0],
        "margin": 15,
        "fontSize": 12,
        "backgroundColor": {
          "type": "linear",
          "x": 0,
          "y": 0,
          "x2": 0,
          "y2": 1,
          "colorStops": [{
            "offset": 0,
            "color": "#fff"
          }, {
            "offset": 0.86,
            "color": "#fff"
          }, {
            "offset": 0.86,
            "color": "#33c0cd"
          }, {
            "offset": 1,
            "color": "#33c0cd"
          }],
          "global": false
        }
      }
    },
    "boundaryGap": false
  }],
  "yAxis": [{
    "type": "value",
    "axisTick": {
      "show": false
    },
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#DCE2E8"
      }
    },
    "axisLabel": {
      "textStyle": {
        "color": "#556677"
      }
    },
    "splitLine": {
      "show": false
    }
  }, {
    "type": "value",
    "position": "right",
    "axisTick": {
      "show": false
    },
    "axisLabel": {
      "textStyle": {
        "color": "#556677"
      },
      "formatter": "{value}"
    },
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#DCE2E8"
      }
    },
    "splitLine": {
      "show": false
    }
  }],
  "series": [{
    "name": "Adidas",
    "type": "line",
    "data": [10, 10, 30, 12, 15, 3, 7],
    "symbolSize": 1,
    "symbol": "circle",
    "smooth": true,
    "yAxisIndex": 0,
    "showSymbol": false,
    "lineStyle": {
      "width": 5,
      "color": {
        "x": 0,
        "y": 1,
        "x2": 0,
        "y2": 0,
        "type": "linear",
        "global": false,
        "colorStops": [{
          "offset": 0,
          "color": "#9effff"
        }, {
          "offset": 1,
          "color": "#9E87FF"
        }]
      },
      "shadowColor": "rgba(158,135,255, 0.3)",
      "shadowBlur": 10,
      "shadowOffsetY": 20
    },
    "itemStyle": {
      "color": "#9E87FF",
      "borderColor": "#9E87FF"
    }
  }, {
    "name": "Nike",
    "type": "line",
    "data": [5, 12, 11, 14, 25, 16, 10],
    "symbolSize": 1,
    "symbol": "circle",
    "smooth": true,
    "yAxisIndex": 0,
    "showSymbol": false,
    "lineStyle": {
      "width": 5,
      "color": {
        "x": 1,
        "y": 1,
        "x2": 0,
        "y2": 0,
        "type": "linear",
        "global": false,
        "colorStops": [{
          "offset": 0,
          "color": "#73DD39"
        }, {
          "offset": 1,
          "color": "#73DDFF"
        }]
      },
      "shadowColor": "rgba(115,221,255, 0.3)",
      "shadowBlur": 10,
      "shadowOffsetY": 20
    },
    "itemStyle": {
      "color": "#73DDFF",
      "borderColor": "#73DDFF"
    }
  }, {
    "name": "老北京布鞋",
    "type": "line",
    "data": [150, 120, 170, 140, 500, 160, 110],
    "symbolSize": 1,
    "yAxisIndex": 1,
    "symbol": "circle",
    "smooth": true,
    "showSymbol": false,
    "lineStyle": {
      "width": 5,
      "color": {
        "x": 0,
        "y": 0,
        "x2": 1,
        "y2": 0,
        "type": "linear",
        "global": false,
        "colorStops": [{
          "offset": 0,
          "color": "#fe9a"
        }, {
          "offset": 1,
          "color": "#fe9a8b"
        }]
      },
      "shadowColor": "rgba(254,154,139, 0.3)",
      "shadowBlur": 10,
      "shadowOffsetY": 20
    },
    "itemStyle": {
      "color": "#fe9a8b",
      "borderColor": "#fe9a8b"
    }
  }]
}
import { addCustomChart } from '@/api/chart'
import shareChart from '@/views/component/shareChart'
import { _mergechart } from '@/views/chart/js/createOption'
import { chartTypeList } from '@/views/chart/js/operator'
import rightStyle from './rightStyle'
import ChartCompoent from '@/views/chart/chart'
import { _uuid } from "@/utils/util"
import axios from 'axios'
export default {
  components: {
    shareChart,
    rightStyle,
    ChartCompoent
  },
  data () {
    return {
      chartTypeList,
      visible: false,
      chartOption: JSON.stringify(test),
      createChart: false,
      chart: {
        type: "customChart"
      },
      chartMoudle: {
        uuid: '',
        classType: '20',
        chartImage: '',
        type: 'customChart',
        fields: {
          dimension: [[], []],
          measure: [[], []],
          filter: [[], []]
        },
        dataset: {
          "uuid": "",
          "name": "",
          "tableName": "",
          "type": "",
        },
        title: {
          show: true,
          name: '',
          remarks: '',
          background: '#d9d9d9',
          border: 1,
          color: 'rgba(0, 0, 0, 0.65)'
        },
        position: {
          x: 0,
          y: 0,
          w: 8,
          h: 6
        },
        common: {
          seriesType: [],
          axis: [
            {
              name: '坐标',
              selectAxis: 'xAxis', // 是否可以选择x、y轴
              fields: 'dimension',
              type: 'dimension', // 可以接受字段类型，dimension，measure，all
              index: 0,
              min: 1,
              max: 1
            },
            {
              name: '维度',
              selectAxis: '', // 是否可以选择x、y轴
              fields: 'dimension',
              type: 'dimension', // 可以接受字段类型，dimension，measure，all
              index: 1
            },
            {
              name: '指标',
              selectAxis: '', // 是否可以选择x、y轴
              fields: 'measure',
              type: 'measure', // 可以接受字段类型，dimension，measure，all
              serieType: '',
              serieChange: true,
              index: 0,
              min: 1,
            }
          ]
        },
        option: {}
      },
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {


  },
  watch: {

  },
  beforeDestroy () {

  },
  methods: {
    changeChart (isMerge) {
      this.createChart = false
      this.chart = JSON.parse(JSON.stringify(this.chartMoudle))

      let chartOption = JSON.parse(this.chartOption)
      let option = {}
      if (isMerge) {
        option = _mergechart(chartOption)
      } else {
        option = chartOption
      }

      this.chart.option = option
      if (!option.xAxis) {
        this.chart.common.axis.splice(0, 1)
        this.chart.common.axis[1].serieChange = false
      }
      for (let i = 0; i < option.series.length; i++) {
        this.chart.common.seriesType.push(option.series[i].type)
      }
      this.chart.uuid = _uuid()
      this.chart.noUpdate = true
      this.$nextTick(() => {
        this.createChart = true
      })
    },
    finishSave (param) {

      delete this.chart.noUpdate
      let FormDatas = new FormData()
      FormDatas.append('file', param.chartImage)
      FormDatas.append("name", param.name)
      FormDatas.append("classType", param.classType)
      FormDatas.append("classType", param.classType)
      FormDatas.append("fields", JSON.stringify(this.chart.fields))

      FormDatas.append("dataset", JSON.stringify(this.chart.dataset))
      FormDatas.append("title", JSON.stringify(this.chart.title))
      FormDatas.append("position", JSON.stringify(this.chart.position))
      FormDatas.append("common", JSON.stringify(this.chart.common))
      FormDatas.append("option", JSON.stringify(this.chart.option))

      /**
      axios.post('/biapi/chart/addCustomChart', FormDatas, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {

      }) */

      addCustomChart(FormDatas, { 'Content-Type': 'multipart/form-data' }).then(res => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
