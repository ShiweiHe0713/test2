<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="12" :sm="24" v-if="option.color!==undefined">
        <a-form-item
          label="颜色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <color-group v-model="option.color" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.origin!==undefined">
        <a-form-item
          label="起始位置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select v-model="option.origin" size="small">
            <a-select-option v-for="type in areaOrigin" :key="type.value">
              {{ type.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.shadowBlur!==undefined">
        <a-form-item
          label="阴影大小"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol" >
          <a-input-number v-model="option.shadowBlur" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.shadowColor!==undefined">
        <a-form-item
          label="阴影颜色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <color-group v-model="option.shadowColor" />
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.shadowOffsetX!==undefined">
        <a-form-item
          label="水平偏移"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowOffsetX" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.shadowOffsetY!==undefined">
        <a-form-item
          label="水平垂直"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number v-model="option.shadowOffsetY" size="small"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" v-if="option.opacity!==undefined">
        <a-form-item
          label="透明度"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number v-model="option.opacity" :step="0.1" :max="1" :min="0" size="small"/>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { areaOrigin } from '@/utils/config'
import colorGroup from './colorGroup'
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
        areaOrigin,
        labelCol: { lg: { span: 8 }, sm: { span: 8 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  methods: {

  }
}
</script>
