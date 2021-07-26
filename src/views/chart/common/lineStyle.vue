<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="option.color!==undefined">
        <a-form-item label="颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.color"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.width!==undefined">
        <a-form-item label="线宽"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.width" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.type!==undefined">
        <a-form-item label="类型"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="option.type">
            <a-select-option v-for="type in lineType"
                             :key="type.value">
              {{ type.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.shadowBlur!==undefined">
        <a-form-item label="阴影大小"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowBlur" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.shadowColor!==undefined">
        <a-form-item label="阴影颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.shadowColor"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.shadowOffsetX!==undefined">
        <a-form-item label="水平偏移"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowOffsetX" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.shadowOffsetY!==undefined">
        <a-form-item label="水平垂直"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowOffsetY" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.opacity!==undefined">
        <a-form-item label="透明度"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.opacity"
                          :step="0.1"
                          :max="1"
                          :min="0" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import colorGroup from './colorGroup'
import { lineType } from '@/utils/config'
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {

    colorGroup
  },
  data () {
    return {
      lineType,
      labelCol: { lg: { span: 8 }, sm: { span: 8 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  methods: {

  }
}
</script>
