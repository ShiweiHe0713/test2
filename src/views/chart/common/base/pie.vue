<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="24"
             :sm="24"
             v-if="option.radius!==undefined">
        <a-form-item label="半径"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <div class="flex-center">
            <a-input v-model="option.radius[0]"
                     size="small" />
            ~
            <a-input v-model="option.radius[1]"
                     size="small" />
          </div>

        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.selectedMode!==undefined">
        <a-form-item label="多个选中"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-switch v-model="option.selectedMode"
                    size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.clockwise!==undefined">
        <a-form-item label="顺时针"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-switch v-model="option.clockwise"
                    size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.startAngle!==undefined">
        <a-form-item label="起始角度"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input v-model="option.startAngle"
                   size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.roseType!==undefined">
        <a-form-item label="南丁格尔"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-switch v-model="option.roseType"
                    size="small" />
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
