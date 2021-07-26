<template>
  <a-form>
    <a-row :gutter="10">

      <a-col :md="12" :sm="24" v-if="option.stack!==undefined">
        <a-form-item
          label="是否堆叠"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-switch v-model="option.stack" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.step!==undefined">
        <a-form-item
          label="阶梯线"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-switch v-model="option.step" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.smooth!==undefined">
        <a-form-item
          label="平滑曲线"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-switch v-model="option.smooth" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.symbol!==undefined">
        <a-form-item
          label="拐点图形"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-model="option.symbol" size="small">
            <a-select-option v-for="symbol in symbolType" :key="symbol.value">
              {{ symbol.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.symbolSize!==undefined">
        <a-form-item
          label="拐点大小"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number v-model="option.symbolSize" size="small"/>
        </a-form-item>
      </a-col>
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
    }
  },
  data () {
    return {
        symbolType,
        labelCol: { lg: { span: 8 }, sm: { span: 8 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  methods: {

  }
}
</script>
