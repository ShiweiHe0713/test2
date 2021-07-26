<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="option.show!==undefined">
        <a-form-item label="是否显示"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-switch v-model="option.show"
                    size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24">
        <a-form-item label="数值区间"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model='option.min' />
          ~~
          <a-input-number v-model='option.max' />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.left!==undefined">
        <a-form-item label="位置"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="option.left"
                    size="small">

            <a-select-option value="left">
              左
            </a-select-option>
            <a-select-option value="right">
              右
            </a-select-option>
          </a-select>
          ~
          <a-select v-model="option.top"
                    size="small">

            <a-select-option value="top">
              上
            </a-select-option>
            <a-select-option value="bottom">
              下
            </a-select-option>
          </a-select>
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
