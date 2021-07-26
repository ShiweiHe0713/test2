<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="option.symbol!==undefined">
        <a-form-item label="拐点图形"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="option.symbol"
                    size="small">
            <a-select-option v-for="symbol in symbolType"
                             :key="symbol.value">
              {{ symbol.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.symbolSize!==undefined">
        <a-form-item label="拐点大小"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.symbolSize"
                          size="small" />
        </a-form-item>
      </a-col>
      <template v-if="type=='all'&&option.additional&&option.additional.overall==type">
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.visualMap.min!==undefined">
          <a-form-item label="最小值"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-input-number v-model="option.additional.visualMap.min"
                            size="small" />
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.visualMap.max!==undefined">
          <a-form-item label="最大值"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-input-number v-model="option.additional.visualMap.max"
                            size="small" />
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.visualMap.inRange!==undefined">
          <a-form-item label="散点大小"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <div class="flex-center">
              <a-input-number v-model="option.additional.visualMap.inRange.symbolSize[0]"
                              size="small" />
              ~
              <a-input-number v-model="option.additional.visualMap.inRange.symbolSize[1]"
                              size="small" />
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.regression!==undefined">
          <a-form-item label="回归线"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-switch v-model="option.additional.regression.show"
                      size="small" />
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.regression!==undefined">
          <a-form-item label="回归线分类"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-switch v-model="option.additional.regression.singleLine"
                      size="small" />
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.additional.regression!==undefined&&option.additional.regression.show">
          <a-form-item label="线类型"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-select v-model="option.additional.regression.type"
                      size="small">
              <a-select-option value='exponential'>
                exponential
              </a-select-option>
              <a-select-option value='linear'>
                linear
              </a-select-option>
              <a-select-option value='logarithmic'>
                logarithmic
              </a-select-option>
              <a-select-option value='polynomial'>
                polynomial
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>

<script>
import { symbolType } from '@/utils/config'
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {}
  },
  data () {
    return {
      symbolType,
      labelCol: { lg: { span: 8 }, sm: { span: 8 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
