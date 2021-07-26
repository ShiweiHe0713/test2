<template>
  <div class="flex-column data-set-frame">
    <color-group v-model="test.color"
                 ref="testColor"
                 v-if="false" />
    <color-test v-model="test.color"
                ref="testColor"
                v-if="false" />
    <!--数据选择-->
    {{dataset.uuid}}
    <div class="flex-row data-set-list">
      <div>
        <span class="select-header">类型: </span>
        <a-select v-model="datasetType"
                  style="width:80px"
                  @change="changeDatasetType"
                  size="small">
          <a-select-option value="excel">
            EXCEL
          </a-select-option>
          <a-select-option value="interface">
            接口
          </a-select-option>
          <a-select-option value="mysql">
            MySql
          </a-select-option>
        </a-select>
      </div>
      <div class="flex flex-row"
           style="margin:0 5px">
        <span class="select-header">数据集: </span>
        <a-select show-search
                  v-model="dataset.uuid"
                  @change="changeDataset($event,false)"
                  class="flex"
                  size="small">
          <a-select-option v-for="item in datasetList"
                           :value="item.uuid"
                           :key="item+'_dataset'">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="flex-row">
      <!--数据字段列表-->
      <div class="flex">
        <field-list :fieldList="fieldsList"
                    v-if="fieldsList.length>0"></field-list>
      </div>
      <!--维度、指标选择-->
      <div class="flex flex-column"
           v-if="dataset.uuid"
           :key="dataset.uuid+'_dataset'">
        <div v-if="dataset.uuid"
             :key="dataset.uuid+'_dataset'">
          <template v-for="(item,index) in chartRule">
            <chart-field :key="index+'_chart_field_type'"
                         :fieldRule="chartRule"
                         :item="item"
                         :fields="fields"
                         :seriesType='seriesType'
                         @changeData="changeData"></chart-field>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import colorGroup from '@/views/chart/common/colorGroup'
import colorTest from '@/views/chart/common/color'
import vm from '@/event.js'
import { getDataSetlist, getDataSetFieldList, getAllField } from '@/api/dataset'
import { _clone, _getDiff, _debounce } from '@/utils/util'
import { axis, fieldRule } from '@/views/chart/js/axis'
import FieldList from './field'
import ChartField from './chartField'
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable,
    FieldList,
    ChartField,
    colorGroup,
    colorTest
  },
  data () {
    return {
      dimensions: [],
      measures: [],
      fieldsList: [],
      dataset: {
        "uuid": "",
        "name": "",
        "tableName": "",
        "type": "",
      },
      fields: {},
      axis: {},
      fieldRule,
      datasetList: [],
      datasetType: '',
      datasetId: '',
      test: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      },
      chartRule: {},
      seriesType: [],
    }
  },
  mounted () {

  },
  created () {
    if (axis[this.$attrs['type']]) {
      this.chartRule = _clone(axis[this.$attrs['type']])
    } else {
      this.chartRule = _clone(this.$attrs['common']["axis"])
      this.seriesType = this.$attrs['common']["seriesType"]
    }
    this.datasetType = this.$attrs['dataset'].type
    this.getDataSet(true)
  },

  beforeDestroy () {
  },

  methods: {
    isVilad () {
      const rules = this.chartRule
      let flag = true
      if (rules && rules.length > 0) {
        for (let i = 0; i < rules.length; i++) {
          this.curFields = this.fields[rules[i].type][rules[i].index]
          let len = this.curFields.length
          let min = rules[i].min != undefined ? rules[i].min : -1
          let max = rules[i].max != undefined ? rules[i].max : 100000
          if (len < min || len > max) {
            flag = false
            break
          }
        }
      }

      return flag
    },
    resetInitData () {
      this.fields.dimension = [[], []]
      this.fields.measure = [[], []]
      this.fields.filter = [[], []]
    },
    changeData: _debounce(function (chartId) {
      let rule = this.isVilad()
      if (!rule) return
      vm.$emit(chartId + '_change', {
        key: 'dataset',
        data: {
          dataset: this.dataset,
          fields: this.fields
        }
      })
    }, 2000),
    getDataSet (isFirst) {
      getDataSetlist({ type: this.datasetType }).then((res) => {
        if (res && res.data) {
          this.datasetList = res.data
          this.changeDataset('', true)
        }
      })
    },
    changeDatasetType (val) {
      this.getDataSet()
    },
    changeDataset (val, update) {
      if (update || this.$attrs['dataset'].uuid == this.dataset.uuid) {
        this.dataset = { ...this.dataset, ..._clone(this.$attrs['dataset']) }
        this.fields = _clone(this.$attrs['fields'])
      } else {
        if (val) {
          if (this.$attrs['dataset'].uuid != this.dataset.uuid) {
            this.resetInitData()
          }
          const datasetList = this.datasetList
          for (let i = 0; i < datasetList.length; i++) {
            if (val === datasetList[i]['uuid']) {
              this.dataset = datasetList[i]
              break
            }
          }

        }
      }
      this.getFieldList()
    },
    getFieldList () {
      getAllField({ datasetUuid: this.dataset.uuid }).then((res) => {
        if (res && res.data) {
          this.fieldsList = res.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.data-set-frame {
  padding: 0 10px;
  .data-set-list {
    padding: 10px 0;
  }
}
</style>
