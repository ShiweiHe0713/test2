<template>
  <a-form :form="form">
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="style.color!==undefined">
        <a-form-item label="颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="style.color"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.width!==undefined">
        <a-form-item label="线宽"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.width" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.type!==undefined">
        <a-form-item label="类型"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.type">
            <a-select-option v-for="type in lineType"
                             :key="type.value">
              {{ type.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.shadowBlur!==undefined">
        <a-form-item label="阴影大小"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.shadowBlur" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.shadowColor!==undefined">
        <a-form-item label="阴影颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="style.shadowColor"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.shadowOffsetX!==undefined">
        <a-form-item label="水平偏移"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.shadowOffsetX" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.shadowOffsetY!==undefined">
        <a-form-item label="水平垂直"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.shadowOffsetY" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.opacity!==undefined">
        <a-form-item label="透明度"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.opacity"
                          :step="0.1"
                          :max="1"
                          :min="0" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { lineType } from '@/utils/config'
import colorGroup from './colorGroup'
export default {
  props: {
    style: {
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
