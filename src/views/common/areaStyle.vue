<template>
  <a-form :form="form">
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="style.color!==undefined">
        <a-form-item label="颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.color"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.origin!==undefined">
        <a-form-item label="起始位置"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.origin">
            <a-select-option v-for="type in areaOrigin"
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
          <color-group v-model="option.shadowColor"
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
import colorGroup from './colorGroup'
import { areaOrigin } from '@/utils/config'
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
      areaOrigin,
      labelCol: { lg: { span: 8 }, sm: { span: 8 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  methods: {

  }
}
</script>
