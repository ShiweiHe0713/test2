<template>
  <a-row :gutter="10">
    <a-col :md="12"
           :sm="24"
           v-if="option.show!==undefined">
      <a-form-item label="显示"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-switch v-model="option.show"
                  size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.type!==undefined">
      <a-form-item label="类型"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-select v-model="option.type"
                  size="small"
                  style="width:100%">
          <a-select-option value="plain">
            正常
          </a-select-option>
          <a-select-option value="scroll">
            翻页
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24">
      <a-form-item label="top"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input v-model="option.top"
                 size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24">
      <a-form-item label="bottom"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input v-model="option.bottom"
                 size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24">
      <a-form-item label="left"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input v-model="option.left"
                 size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24">
      <a-form-item label="right"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input v-model="option.right"
                 size="small" />
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script>
import { labelCol, wrapperCol } from '@/utils/config'
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
      labelCol,
      wrapperCol
    }
  },
  methods: {

  }
}
</script>
