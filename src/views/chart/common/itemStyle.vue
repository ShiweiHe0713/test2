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
             v-if="option.color0!==undefined">
        <a-form-item label="颜色1"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.color0"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.borderColor!==undefined">
        <a-form-item label="描边颜色"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.borderColor"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.borderColor0!==undefined">
        <a-form-item label="描边颜色1"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <color-group v-model="option.borderColor0"
                       size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.borderWidth!==undefined">
        <a-form-item label="描边线宽"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.borderWidth"
                          :step="1" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.borderType!==undefined">
        <a-form-item label="描边类型"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="option.borderType">
            <a-select-option v-for="type in lineType"
                             :key="type.value">
              {{ type.label }}
            </a-select-option>
          </a-select>
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
             v-if="option.shadowBlur!==undefined">
        <a-form-item label="阴影长度"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowBlur"
                          :step="1" />
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
import { lineType } from '@/utils/config'
import colorGroup from './colorGroup'
import { labelPosition, fontStyle, fontWeight, fontFamily, labelAlign, verticalAlign } from '@/utils/config'
import vcolorpicker from 'vcolorpicker'
export default {
  components: {
    vcolorpicker,
    colorGroup
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () { },
  data () {
    return {
      lineType,
      labelPosition,
      fontStyle,
      fontWeight,
      fontFamily,
      labelAlign,
      verticalAlign,
      labelCol: { lg: { span: 8 }, sm: { span: 8 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  methods: {

  }
}
</script>
