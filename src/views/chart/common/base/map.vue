<template>
  <a-form>
    <a-row :gutter="10">
      <a-col :md="12"
             :sm="24"
             v-if="option.roam!==undefined">
        <a-form-item label="缩放"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-switch v-model="option.roam"
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
