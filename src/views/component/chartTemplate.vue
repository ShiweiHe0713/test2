<template>
  <div>
    <div>
      <a-button type="primary"
                @click="addToDashboard">
        保存到当前报表
      </a-button>
    </div>
    <div class="flex-column chart-icon-list ">
      <template v-for='(classType,index) in classTypeList'>
        <div :key='index+"_classtype"'
             class="flex-row">
          <span class="class-type-name">
            {{classType}}
          </span>
          <div class="flex-row">
            <template v-if='chartlist[classType["value"]]'>
              <div v-for="(chart,chartIndex) in chartlist[classType['value']]"
                   :key='chartIndex+"_chart"'
                   class="flex-column chart-frame">
                <div>
                  <img :src="chart.background"
                       :alt="chart.name" />
                </div>
                <div><span>{{chart.name}}</span></div>
                <div>
                  <a-checkbox @change="addChart($event,chart.uuid)">
                  </a-checkbox>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { classTypeList } from '@/views/chart/js/operator'
import { getCommonChart } from '@/api/chart'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      classTypeList,
      chartlist: {},
      selectedList: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    addToDashboard () {

    },
    addChart (e, uuid) {
      if (e.target.checked) {
        this.selectedList.push(uuid)
      } else {
        let index = this.selectedList.indexOf(uuid)
        if (index >= 0) {
          this.selectedList.splice(index, 1)
        }
      }
    },
    init () {
      getCommonChart().then(res => {
        if (res && res.data) {
          this.selectedList = res.data
        }
      })
    }

  },
  watch: {

  }
}
</script>
<style lang="less" scoped>
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
.chart-frame {
  width: 20%;
}
</style>