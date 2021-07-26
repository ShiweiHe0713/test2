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
           v-if="option.name!==undefined">
      <a-form-item label="标题"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input v-model="option.name"
                 size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.color!==undefined">
      <a-form-item label="颜色"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">

        <color-group v-model="option.color" />
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.fontStyle!==undefined">
      <a-form-item label="风格"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-select v-model="option.fontStyle"
                  size="small">
          <a-select-option v-for="font in fontStyle"
                           :key="font.value">
            {{ font.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.fontWeight!==undefined">
      <a-form-item label="粗细"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-select v-model="option.fontWeight"
                  size="small">
          <a-select-option v-for="weigt in fontWeight"
                           :key="weigt.value">
            {{ weigt.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.fontFamily!==undefined">
      <a-form-item label="字体"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-select v-model="option.fontFamily"
                  size="small">
          <a-select-option v-for="family in fontFamily"
                           :key="family.value">
            {{ family.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :md="12"
           :sm="24"
           v-if="option.fontSize!==undefined">
      <a-form-item label="大小"
                   :labelCol="labelCol"
                   :wrapperCol="wrapperCol">
        <a-input-number v-model="option.fontSize"
                        :step="1"
                        size="small" />
      </a-form-item>
    </a-col>
    <a-col :md="24"
           :sm="6"
           v-if="option.remarks!==undefined">
      <a-form-item label="备注"
                   :labelCol="alllabelCol"
                   :wrapperCol="allwrapperCol">
        <a-textarea v-model="option.remarks" />
      </a-form-item>
    </a-col>
  </a-row>
</template>

<script>
import { labelCol, wrapperCol, fontStyle, fontWeight, fontFamily, alllabelCol, allwrapperCol } from '@/utils/config'
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
  created () {
  },
  data () {
    return {
      labelCol,
      wrapperCol,
      fontStyle,
      fontWeight,
      fontFamily,
      allwrapperCol,
      alllabelCol
    }
  },
  methods: {

  }
}
</script>
