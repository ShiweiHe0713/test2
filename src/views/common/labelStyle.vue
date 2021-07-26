<template>
  <a-form :form="form">
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="style.position!==undefined">
        <a-form-item label="位置"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.position">
            <a-select-option v-for="position in labelPosition"
                             :key="position.value">
              {{ position.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.distance!==undefined">
        <a-form-item label="距离"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.distance" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.rotate!==undefined">
        <a-form-item label="标签旋转"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.rotate"
                          :step="1"
                          :max="90"
                          :min="-90" />
        </a-form-item>
      </a-col>
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
             v-if="style.fontStyle!==undefined">
        <a-form-item label="风格"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.fontStyle">
            <a-select-option v-for="font in fontStyle"
                             :key="font.value">
              {{ font.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.fontWeight!==undefined">
        <a-form-item label="粗细"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.fontWeight">
            <a-select-option v-for="weigt in fontWeight"
                             :key="weigt.value">
              {{ weigt.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.fontFamily!==undefined">
        <a-form-item label="字体"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.fontFamily">
            <a-select-option v-for="family in fontFamily"
                             :key="family.value">
              {{ family.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.fontSize!==undefined">
        <a-form-item label="大小"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.fontSize"
                          :step="1" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="style.verticalAlign!==undefined">
        <a-form-item label="水平对齐"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="style.verticalAlign">
            <a-select-option v-for="vertical in verticalAlign"
                             :key="vertical.value">
              {{ vertical.label }}
            </a-select-option>
          </a-select>
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
             v-if="style.shadowBlur!==undefined">
        <a-form-item label="阴影长度"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="style.shadowBlur"
                          :step="1" />
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
    </a-row>
  </a-form>
</template>

<script>
import { labelPosition, fontStyle, fontWeight, fontFamily, labelAlign, verticalAlign } from '@/utils/config'
import vcolorpicker from 'vcolorpicker'
import colorGroup from './colorGroup'
export default {
  components: {
    vcolorpicker,
    colorGroup
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
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
