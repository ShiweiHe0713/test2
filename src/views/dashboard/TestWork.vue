<template>

  <div class="flex-row dashboard">
    <div class="left flex-column">
      <dashboard-header v-if='updateDashboard'
                        :dashboard='dashboard'></dashboard-header>
      <rightStyle class='flex'
                  v-if="Editing_Id"
                  :key="Editing_Id+'_editing'"
                  :chartData="curChartData"
                  v-bind="$attrs"
                  :chartList='chartList'></rightStyle>
    </div>
    <div class="flex flex-column dashboard-content"
         ref="gridlayoutFrame">
      <div class="chart-icon-list">
        <div class="common-use-chart">
          <div class="flex-row "
               v-for="(commonchart,index) in charIcon.common"
               :key="index+'_common'">
            <span class="flex-center">{{ commonchart.name+":" }}</span>
            <div class="flex-row flex">
              <div class="flex-column chart-icon-frame"
                   v-for="(child,childIndex) in commonchart.children"
                   :key="childIndex+'_child_common'"
                   @click="addChart(child.type)">
                <svg-icon class="chart-icon"
                          :icon-class="child.icon"></svg-icon>
                <span class="flex-center">{{ child.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="all-use-chart"
             style="display:none">
          <div class="flex-row"
               v-for="(commonchart,index) in charIcon.all"
               :key="index+'_all'">
            <span class="flex-center">{{ commonchart.name+":" }}</span>
            <div class="flex-row flex">
              <div class="flex-column chart-icon-frame"
                   v-for="(child,childIndex) in commonchart.children"
                   :key="childIndex+'_child_all'">
                <svg-icon class="chart-icon"
                          :icon-class="child.icon"></svg-icon>
                <span class="flex-center">{{ child.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height:10px;background:#f7f8fa"></div>
      <div>
        <div v-for="(line,index) in verticalLine"
             :key="index+'verticalLine'"
             class="vertical-line"
             :style="{left:line+'px'}">
        </div>
        <div v-for="(line,index) in transverseLine"
             :key="index+'transverseLine'"
             class="transverse-line"
             :style="{top:line+'px'}">
        </div>

      </div>
      <div class="flex chart-frame">

        <grid-layout ref="gridlayout"
                     :style="gridlayoutStyle"
                     :layout.sync="layout"
                     :col-num="colNum"
                     :row-height="rowHeight"
                     :margin="[0, 0]"
                     :is-draggable="true"
                     :is-resizable="true"
                     :vertical-compact="true"
                     :use-css-transforms="true"
                     @layout-created="layoutCreatedEvent"
                     @layout-before-mount="layoutBeforeMountEvent"
                     @layout-mounted="layoutMountedEvent"
                     @layout-ready="layoutReadyEvent"
                     @layout-updated="layoutUpdatedEvent">
          <grid-item :key="item.i"
                     v-for="(item,index) in layout"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     @resize="resizeEvent"
                     @move="moveEvent"
                     @resized="resizedEvent"
                     @container-resized="containerResizedEvent"
                     @moved="movedEvent">
            <chart-compoent :data="chartList[index]"
                            :class="['chart-style',item.i==Editing_Id?'chart-editing':false]"></chart-compoent>
          </grid-item>
        </grid-layout>

      </div>

    </div>

  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import { chartOption } from '@/views/chart/js/createOption'
import ChartCompoent from '@/views/chart/chart'
import rightStyle from './rightStyle'
import { mapState } from 'vuex'
import { charIcon } from '@/views/chart/js/common'
import vm from '@/event.js'
import dashboardHeader from './dashboardHeader'
import { getOne } from '@/api/dashboard'
import { _merge, _addChartParm, _getChartParm, _debounce, _getArrayIndex } from '@/utils/util'
import { saveChart, getAllChart, batchUpdateChart, deleteChart } from '@/api/chart'
// import vm from '@/event.js'
const mouseXY = { 'x': null, 'y': null }
export default {
  components: {
    GridLayout,
    GridItem,
    ChartCompoent,
    rightStyle,
    dashboardHeader
  },
  data () {
    return {
      updateDashboard: true,
      firstUpdate: false,
      dashboard: {
        uuid: '93cdd7a0-8554-11eb-a6d4-d37ae26a9833',
        name: 'test',
        config: {
          type: 1,
          background: '#ffffff',
          opacity: 1,
        },
        share: 1,
        type: 1,
        description: '',
      },
      charIcon,
      colNum: 12,
      rowHeight: 30,
      gridlayoutPosition: {},
      gridlayoutStyle: {

      },
      layout: [
      ],
      chartList: [],
      eventLog: [],
      curChartData: {},
      verticalLine: [],
      transverseLine: [],
      dashboardUuid: '93cdd7a0-8554-11eb-a6d4-d37ae26a9833'
    }
  },
  computed: {
    ...mapState({
      Editing_Id: state => state.chart.id
    })
  },
  mounted () {
    document.addEventListener('dragover', function (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }, false)
  },
  created () {
    vm.$off('change-dashboard-method')
    vm.$on('change-dashboard-method', (data) => {
      this[data.method](data.params)
    })
    this.initDashboard()
    this.initChart()
    setTimeout(() => {
      this.setLayout()
    }, 0)
  },

  beforeDestroy () {
    vm.$off('change-dashboard-method')
  },
  methods: {
    async initDashboard () {
      let res = await getOne({ uuid: this.dashboardUuid })
      if (res && res.data && res.data[0]) {
        let curDashboard = { ...res.data[0], config: JSON.parse(res.data[0].config) }
        _merge(this.dashboard, curDashboard)
      }

    },
    async initChart () {
      this.layout = []
      this.chartList = []
      let res = await getAllChart({ dashboardUuid: this.dashboardUuid })
      if (res && res.data) {
        for (let i = 0; i < res.data.length; i++) {
          const chart = _getChartParm(res.data[i])

          this.layout.push({ ...chart.position, i: chart.uuid })
          this.chartList.push(chart)
          if (i == 0) {
            this.$nextTick(() => {
              this.editChart({ id: chart.uuid })

            })

          }
        }
      }
      /**
       const chart = chartOption.init('line')
       chart.uuid = this.layout.length + 1
       chart.title.name = 'line-' + (this.layout.length + 1)
       console.info('test')
       this.layout.push({ ...chart.position, i: chart.uuid })
       this.chartList.push(chart)
 
       const newChart = chartOption.init('bar')
       newChart.uuid = this.layout.length + 1
       this.chartList.push(newChart)
       this.layout.push({ ...newChart.position, i: newChart.uuid })
       this.$store.commit('SET_CHART_ID', chart.uuid)
       this.curChartData = chart
        */
    },
    async addChart (type) {
      const chartParam = chartOption.init(type)
      if (!chartParam) return
      chartParam.name = type + '_' + this.layout.length
      let param = _addChartParm(chartParam)
      param.dashboardUuid = this.dashboard.uuid
      let res = await saveChart(param)
      const chart = _getChartParm(res.data)
      this.layout.push({ ...chart.position, i: chart.uuid })
      this.chartList.push(chart)
      this.curChartData = chart
      this.$store.commit('SET_CHART_ID', chart.uuid)
    },
    setLayout () {
      /**
      this.gridlayoutPosition = this.$refs['gridlayoutFrame'].getBoundingClientRect()
      const totalWidth = this.gridlayoutPosition.width
      const lrWidth = totalWidth % this.colNum - 1
      this.$refs['gridlayoutFrame'].style['margin'] = '0 ' + lrWidth / 2 + 'px'
      const layoutWidth = totalWidth - lrWidth
      const everyEleWidth = layoutWidth / this.colNum
      this.gridlayoutStyle = {
          width: (layoutWidth + 1) + 'px',
          background: 'linear-gradient(90deg,rgba(14,49,63,.5) 1px solid,transparent 0), linear-gradient(rgba(14,49,63,.5) 1px,transparent 0)',
          'background-size': everyEleWidth + 'px ' + this.rowHeight + 'px'
      }
       */
      this.gridlayoutPosition = this.$refs['gridlayoutFrame'].getBoundingClientRect()
      const totalWidth = this.gridlayoutPosition.width
      const lrWidth = totalWidth % this.colNum - 1
      this.$refs['gridlayoutFrame'].style['margin'] = '0 ' + lrWidth / 2 + 'px'
      const layoutWidth = totalWidth - lrWidth
      const everyEleWidth = layoutWidth / this.colNum
      this.verticalLine = [0]
      let verticalWidth = 0
      for (let i = 0; i < this.colNum; i++) {
        if (i === this.colNum - 1) {
          this.verticalLine.push(verticalWidth + everyEleWidth - 1)
        } else {
          this.verticalLine.push(verticalWidth + everyEleWidth)
        }
        verticalWidth += everyEleWidth
      }
      this.transverseLine = [93]
      do {
        this.transverseLine.push(this.transverseLine[this.transverseLine.length - 1] + this.rowHeight)
      }
      while (this.transverseLine[this.transverseLine.length - 1] < this.gridlayoutPosition.height)
    },
    deleteChart ({ id }) {
      deleteChart({ uuid: id }).then(() => {
        const { index } = _getArrayIndex(this.chartList, 'uuid', id)
        this.chartList.splice(index, 1)
        this.layout.splice(index, 1)
        this.$message.success("删除成功")
      })
    },
    editChart ({ id }) {
      const { obj } = _getArrayIndex(this.chartList, 'uuid', id)
      this.curChartData = obj
      this.$store.commit('SET_CHART_ID', id)
    },
    moveEvent: function (i, newX, newY) {
      const msg = 'MOVE i=' + i + ', X=' + newX + ', Y=' + newY
      this.eventLog.push(msg)
      console.log(msg)
    },
    movedEvent: function (i, newX, newY) {
      const msg = 'MOVED i=' + i + ', X=' + newX + ', Y=' + newY
      this.eventLog.push(msg)
      console.log(msg)
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {

      const msg = 'RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx
      this.eventLog.push(msg)
      console.log(msg)
    },
    resizedEvent: function (i, newX, newY, newHPx, newWPx) {
      const msg = 'RESIZED i=' + i + ', X=' + newX + ', Y=' + newY + ', H(px)=' + newHPx + ', W(px)=' + newWPx

      vm.$emit('change-chart-' + i, { method: 'resizeChart', param: '' })
    },
    containerResizedEvent: function (i, newH, newW, newHPx, newWPx) {
      const msg = 'CONTAINER RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx
      this.eventLog.push(msg)
      console.log(msg)
    },
    layoutCreatedEvent: function (newLayout) {
      this.eventLog.push('Created layout')
      console.log('Created layout: ', newLayout)
    },
    layoutBeforeMountEvent: function (newLayout) {
      this.eventLog.push('beforeMount layout')
      console.log('beforeMount layout: ', newLayout)
    },
    layoutMountedEvent: function (newLayout) {
      this.eventLog.push('Mounted layout')
      console.log('Mounted layout: ', newLayout)
    },
    layoutReadyEvent: function (newLayout) {
      this.eventLog.push('Ready layout')
      console.log('Ready layout: ', newLayout)
    },
    layoutUpdatedEvent: function (newLayout) {
      if (!this.firstUpdate) {
        setTimeout(() => {
          this.firstUpdate = true
        })
        return
      }
      this.eventLog.push('Updated layout')
      console.log('Updated layout: ', newLayout)
      let param = []
      for (let i = 0; i < newLayout.length; i++) {
        param.push({ position: JSON.stringify(newLayout[i]), uuid: newLayout[i]['i'] })
      }
      this.changePosition(param)
    },
    changePosition: _debounce((param) => {
      batchUpdateChart({ param: param }).then(res => {

      })
    }, 500),
  }
}
</script>

<style lang="less" scoped>
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
.vue-grid-layout {
  //border-bottom: 1px solid rgba(14,49,63,.5);
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: transparent;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: transparent;
}
.vue-grid-item .text {
  background: #ccc;
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  right: 3px;
  margin: 0;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
.dashboard {
  height: 100%;
  background: #f7f8fa;
  overflow: auto;
}
.left {
  width: 400px;
  height: 100%;
  background: #ffffff;
  overflow: auto;
  margin-right: 10px;
  padding: 0 5px;
}
.dashboard-content {
  position: relative;
  background: #ffffff;
  .vertical-line {
    position: absolute;
    top: 93px;
    bottom: 0;
    border-left: 1px dashed #d9d9d9;
  }
  .transverse-line {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px dashed #d9d9d9;
  }
  .chart-frame {
    position: relative;
    overflow: auto;

    border-radius: 2px;
  }
}
.right {
  width: 400px;
}

.chart-icon-list {
  position: relative;
  padding: 0 10px;
  background: #ffffff;
  .chart-icon-frame {
    margin: 10px;
    .chart-icon {
      margin: 3px;
      width: 40px;
      height: 35px;
    }
  }
}
.chart-style {
  border: 1px dashed #ffffff;
  &.chart-editing {
    border: 1px dashed #13e435;
  }
}
</style>
