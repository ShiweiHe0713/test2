<template>
  <a-form>
    <a-form>
      <a-row :gutter="10">
        <a-col :md="12"
               :sm="24"
               v-if="option.heat!==undefined">
          <a-form-item label="热力图"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-switch v-model="option.heat.show"
                      size="small" />
          </a-form-item>
        </a-col>
        <a-col :md="24"
               :sm="24"
               v-if="option.heat!==undefined&&option.heat.show">
          <a-form-item label="区间"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <div class="flex-center-left">
              <a-input-number v-model="option.heat.range[0]" />
              <span>~</span>
              <a-input-number v-model="option.heat.range[1]" />
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="24"
               :sm="24"
               v-if="option.heat!==undefined&&option.heat.show">
          <a-form-item label="色值"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <template v-for='(item,index) in option.heat.colors'>
              <color-group v-model="option.heat.colors[index]"
                           size="small"
                           :key='index+"_table_background"' />
            </template>
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="option.isSeries!==undefined">
          <a-form-item label="序号"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-switch v-model="option.isSeries"
                      size="small" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-form>
</template>

<script>
import colorGroup from '@/views/chart/common/colorGroup'
import { symbolType } from '@/utils/config'
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {}
  },
  components: {
    colorGroup
  },
  data () {
    return {
      symbolType,
      labelCol: { lg: { span: 8 }, sm: { span: 8 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
