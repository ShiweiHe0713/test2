<template>
  <div>
    <template v-if='item.selectAxis'>
      <a-dropdown>
        <a class="ant-dropdown-link"
           @click="e => e.preventDefault()">
          {{axis=='xAxis'?'X轴':'Y轴'}}
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a @click="changeDatasetAxis('xAxis')">X轴</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="changeDatasetAxis('yAxis')">Y轴</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
    <div class="chart-field-type flex-row">
      <div class="chart-field-type-header flex-center flex-column">
        <span class="select-header flex-center-right">{{ item.name }}</span>

      </div>
      <div class="chart-field-type-content flex">
        <ul class="drag-box-module tag-list-ul flex-center-left">
          <draggable :value="this.fields[this.item.type][this.item.index]"
                     v-bind="dragReceiveOption"
                     @change="handleFieldChange">
            <li v-for="(itemfield,index) in this.fields[this.item.type][this.item.index]"
                :key="itemfield.uuid+'_tag_drag'"
                :class="['tag-list-li',itemfield.fieldType]">
              <a-dropdown>
                <a class="ant-dropdown-link"
                   @click="e => e.preventDefault()">
                  <span>{{itemfield.alias}}</span>
                  <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <template v-if='item.fields=="dimension"'>
                    <a-sub-menu key="sort"
                                title="排序">
                      <template v-for='fieldsort in sortList'>
                        <a-menu-item :key='fieldsort+"_sort"'>
                          <div class="flex-row"
                               @click="setSort(itemfield,fieldsort)">
                            <span> {{fieldsort.label}}</span>
                            <span style="padding-left:10px">
                              <a-badge v-if="itemfield.additional.sort.type==fieldsort.value"
                                       color="green" /></span>
                          </div>
                        </a-menu-item>
                      </template>
                    </a-sub-menu>
                  </template>
                  <template v-if='item.fields=="measure"'>
                    <a-sub-menu key="calculation"
                                title="计算">
                      <template v-for='calculation in calculationList'>
                        <a-menu-item :key='calculation+"calculation"'>
                          <div class="flex-row"
                               @click="setCalculation(itemfield,calculation.value)">
                            <span> {{calculation.label}}</span>
                            <span style="padding-left:10px">
                              <a-badge v-if="itemfield.additional.calculation.type==calculation.value"
                                       color="green" /></span>
                          </div>
                        </a-menu-item>
                      </template>
                    </a-sub-menu>
                    <a-menu-item key="format"
                                 @click="setFormat(itemfield)">
                      显示格式
                    </a-menu-item>
                    <template v-if='item.serieChange'>
                      <a-sub-menu key="chart-series"
                                  title="图形">
                        <template v-for='seriesType in axisChartList'>
                          <a-menu-item :key='seriesType+"_serieType"'>
                            <div class="flex-row"
                                 @click="setSerieType(itemfield,seriesType.value)">
                              <span> {{seriesType.label}}</span>
                              <span style="padding-left:10px">
                                <a-badge v-if="itemfield.seriesType==seriesType.value"
                                         color="green" /></span>
                            </div>
                          </a-menu-item>
                        </template>
                      </a-sub-menu>
                    </template>

                  </template>
                  <template v-if='item.fields=="filter"'>
                    <template v-for='filterComponent in filterComponentList'>
                      <a-menu-item :key='filterComponent+"_component"'>
                        <div class="flex-row"
                             @click="setFilter(itemfield,filterComponent)">
                          <span> {{filterComponent.label}}</span>
                          <span style="padding-left:10px">
                            <a-badge v-if="(itemfield.additional.filter.type+'-'+itemfield.additional.filter.operator)==filterComponent.value"
                                     color="green" /></span>
                        </div>
                      </a-menu-item>
                    </template>
                  </template>
                </a-menu>
              </a-dropdown>

              <span class="fields-close">
                <a-icon type="close-circle"
                        @click='removeField(index)' /></span>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
    <field-format v-if='editformatvisible'
                  :visible.sync="editformatvisible"
                  :format='selectedField.additional.format'>
    </field-format>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import { _isExist, _concat, _eval, _clone } from '@/utils/util'
import { sortList, calculationList, filterComponentList } from '@/views/chart/js/operator'
import { axisChartList } from '@/views/chart/js/axis'
import fieldFormat from './format'
export default {
  props: {
    fields: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fieldRule: {
      type: Array,
      default: () => {
        return []
      }
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    seriesType: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    Draggable,
    fieldFormat
  },
  data () {
    return {
      axisChartList,
      editformatvisible: false,
      dragReceiveOption: {
        group: {
          name: 'modelDrag',
          pull: true,
          put: true
        }
      },
      type: '',
      selectedField: {},
      axis: 'xAxis',
      additional: {
        format: {
          type: 'default',
          value: 0,
        },
        sort: {
          type: 'default',
        },
        calculation: {
          type: 'sum',
        },
        filter: {
          type: 'input',
          operator: 'like',
          value: []
        }
      },
      sortList,
      calculationList,
      filterComponentList
    }
  },
  computed: {
    ...mapState({
      chartId: state => state.chart.id
    })
  },
  created () {
    if (!this.fields[this.item.type][this.item.index]) {
      this.fields[this.item.type][this.item.index] = []
    }
    this.curFields = this.fields[this.item.type][this.item.index]
    for (let i = 0; i < this.curFields.length; i++) {
      this.curFields[i] = { additional: _clone(this.additional), ...this.curFields[i] }

    }
    this.type = this.item.type
    if (this.item.selectAxis) {
      this.axis = this.item.selectAxis
    }
  },
  methods: {
    setSerieType (item, type) {
      item.seriesType = type
    },
    setFormat (item) {
      this.selectedField = item
      this.editformatvisible = true
    },
    setCalculation (item, type) {
      item.additional.calculation.type = type
    },
    setSort (item, type) {
      item.additional.sort.type = type
    },
    changeDatasetAxis (val) {
      this.axis = val
      this.fields[this.item.type][this.item.index].axis = val
      if (this.curFields && this.curFields.length > 0) {
        for (let i = 0; i < this.curFields.length; i++) {
          this.curFields[i].axis = val
        }
      }
    },
    handleFieldChange (evt) {
      if (evt.added && evt.added.element) {
        evt.added.element.axis = this.axis
        this.addField(evt.added.element, evt.added.newIndex)
      } else if (evt.moved && evt.moved.element) {
        this.moveField(evt.moved.element, evt.moved.newIndex)
      }
    },
    moveField (ele, newIndex) {
      const tempArr = this.curFields.filter(item => {
        return ele.id !== item.id
      })
      tempArr.splice(newIndex, 0, ele)
      this.curFields = tempArr
      const isvilad = this.isVilad()
      if (isvilad) {
        this.$emit('changeData', this.chartId)
      }
    },
    addField (ele, index) {
      if (!this.fields[this.item.type][this.item.index]) {
        this.fields[this.item.type][this.item.index] = []
      }
      const indexSort = _isExist(this.fields[this.item.type][this.item.index], 'uuid', ele.uuid)
      if (indexSort >= 0) {
        this.$message.error(`${ele.alias}已经存在不可重复`)
        return false
      }
      if (this.item.max && (this.fields[this.item.type][this.item.index].length + 1) > this.item.max) {
        this.$message.error(`最多只能有${this.item.max}个维度/指标`)
        return false
      }
      let addField = { additional: _clone(this.additional), ...ele, }
      if (this.item.serieChange && this.item.serieType) {
        addField.serieType = this.item.serieType
      } else if (this.seriesType.length > 0 && this.item.serieChange && !this.item.serieType) {
        let seriesIndex = this.fields[this.item.type][this.item.index].length
        addField.serieType = this.seriesType[seriesIndex % this.seriesType.length]
      }
      this.fields[this.item.type][this.item.index].push(addField)
      //const isvilad = this.isVilad()
      this.$emit('changeData', this.chartId)
    },
    removeField (index) {
      this.fields[this.item.type][this.item.index].splice(index, 1)
      this.$emit('changeData', this.chartId)
      //const isvilad = this.isVilad()

    },
    isVilad () {
      const rules = this.fieldRule
      let flag = true
      if (rules && rules.length > 0) {
        for (let i = 0; i < rules.length; i++) {
          this.curFields = this.fields[rules[i].type][rules[i].index]
          let len = this.curFields.length
          let min = rules[i].min ? rules[i].min : -1
          let max = rules[i].max ? rules[i].max : 100000
          if (len < min && len > max) {
            flag = false
            break
          }
        }
      }

      return flag
    },
    /**
    isVilad (curmeasureIndex, curdimensionIndex) {
      const rules = this.fieldRule
      let flag = false
      if (rules && rules.length > 0) {
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i]
          flag = _eval(curdimensionIndex, rule['dimension']['operate'], rule['dimension']['value']) && _eval(curmeasureIndex, rule['measure']['operate'], rule['measure']['value'])
          if (flag) {
            break
          }
        }
      }

      return flag
    }, */
    fieldMove (operator) {
      let curmeasureIndex = _concat(this.fields['measure']).length
      let curdimensionIndex = _concat(this.fields['dimension']).length
      if (operator !== 'sort') {
        if (this.type === 'dimension') {
          curdimensionIndex = operator === '+' ? (curdimensionIndex + 1) : (curdimensionIndex - 1)
        } else if (this.type === 'measure') {
          curmeasureIndex = operator === '-' ? (curmeasureIndex + 1) : (curmeasureIndex - 1)
        }
      }
      return this.isVilad(curmeasureIndex, curdimensionIndex)
    }
  }

}
</script>

<style lang="less">
.chart-field-type {
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  margin-bottom: 8px;
  background: rgba(0, 0, 0, 0.02);
  .select-header {
    color: rgba(0, 0, 0, 0.65);
    width: 50px;
  }
}
.select-header {
  margin-bottom: 8px;
}
.drag-box-module {
  min-height: 100px;
  > div {
    height: 100%;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .fields-tag {
    position: relative;
    display: inline-block;
    border: 1px solid #d9d9d9;
    margin: 5px 10px;
    .fields-name {
      padding: 5px;
    }
    .fields-operator {
      margin: 0 5px;
    }
  }
}
</style>
