<template>
  <div>
    <a-collapse v-model="activeKey"
                @change="changeCollapse">
      <a-collapse-panel key="axis_base">
        <template slot="header">
          基础设置
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="是否显示"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.show"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.position!==undefined">
              <a-form-item label="位置"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-select v-model="option.position"
                          size="small">
                  <a-select-option value="top"
                                   v-if="axisType=='x'">
                    上
                  </a-select-option>
                  <a-select-option value="bottom"
                                   v-if="axisType=='x'">
                    下
                  </a-select-option>
                  <a-select-option value="left"
                                   v-if="axisType=='y'">
                    左
                  </a-select-option>
                  <a-select-option value="right"
                                   v-if="axisType=='y'">
                    右
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.nameLocation!==undefined">
              <a-form-item label="名称位置"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-select v-model="option.nameLocation"
                          size="small">
                  <a-select-option value="top">
                    上
                  </a-select-option>
                  <a-select-option value="middle">
                    中
                  </a-select-option>
                  <a-select-option value="end">
                    下
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24"
                   :sm="24"
                   v-if="option.nameTextStyle!==undefined">
              <label-style :style="option.nameTextStyle"></label-style>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.nameRotate!==undefined">
              <a-form-item label="名称旋转"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input-number v-model="option.nameRotate"
                                size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.inverse!==undefined">
              <a-form-item label="是否反向"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.inverse"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.boundaryGap!==undefined">
              <a-form-item label="是否留白"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.boundaryGap"
                          size="small" />
              </a-form-item>
            </a-col>

          </a-row>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="axis_axisLine"
                        v-if="option.axisLine!==undefined">
        <template slot="header">
          轴线
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="24"
                   :sm="24">
              <a-form-item label="是否显示"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.axisLine.show"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="24"
                   :sm="24">
              <line-style :option="option.axisLine.lineStyle"></line-style>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="axis_axisTick"
                        v-if="option.axisTick!==undefined">
        <template slot="header">
          刻度
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="12"
                   :sm="24"
                   v-if="option.axisTick.show!==undefined">
              <a-form-item label="是否显示"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.axisLine.show"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.axisTick.inside!==undefined">
              <a-form-item label="是否朝内"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.axisTick.inside"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24"
                   v-if="option.axisTick.length!==undefined">
              <a-form-item label="长度"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input-number v-model="option.axisTick.length"
                                size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="24"
                   :sm="24">
              <line-style :option="option.axisTick.lineStyle"></line-style>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="axis_axisLabel"
                        v-if="option.axisLabel!==undefined">
        <template slot="header">
          刻度标签
        </template>
        <label-style :option="option.axisLabel"></label-style>
      </a-collapse-panel>
      <a-collapse-panel key="axis_splitLine"
                        v-if="option.splitLine!==undefined">
        <template slot="header">
          分隔线
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="24"
                   :sm="24">
              <a-form-item label="是否显示"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.splitLine.show"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="24"
                   :sm="24">
              <line-style :option="option.splitLine.lineStyle"></line-style>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="axis_splitArea"
                        v-if="option.splitArea!==undefined">
        <template slot="header">
          分割面积
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="24"
                   :sm="24">
              <a-form-item label="是否显示"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-switch v-model="option.splitArea.show"
                          size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="24"
                   :sm="24">
              <area-style :option="option.splitArea.areaStyle"
                          size="small"></area-style>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { labelCol, wrapperCol } from '@/utils/config'
import lineStyle from './lineStyle'
import labelStyle from './labelStyle'
import legendStyle from './legendStyle'
import areaStyle from './areaStyle'
export default {
  components: {
    lineStyle,
    labelStyle,
    legendStyle,
    areaStyle
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    axisType: {
      type: String,
      default: () => {
        return 'x'
      }
    }
  },
  data () {
    return {
      labelCol,
      wrapperCol,
      activeKey: ['axis_base']
    }
  },
  methods: {
    changeCollapse (key) {
      if (key && key.length > 0) {
        this.activeKey = [key[key.length - 1]]
      } else {
        this.activeKey = []
      }
    }
  }
}
</script>
