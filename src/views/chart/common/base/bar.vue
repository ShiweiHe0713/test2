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
      <a-col :md="12" :sm="24" v-if="option.barWidth!==undefined">
        <a-form-item
          label="宽度"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-model="option.barWidth" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.barGap!==undefined">
        <a-form-item
          label="间距"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input v-model="option.barGap" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.showBackground!==undefined">
        <a-form-item
          label="显示背景"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-switch v-model="option.showBackground" size="small"/>
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
