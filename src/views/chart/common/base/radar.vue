<template>
  <a-form>
    <a-row :gutter="10">
      <template v-if="type=='all'&&radar!=undefined">
        <a-col :md="12"
               :sm="24"
               v-if="radar.shape!==undefined">
          <a-form-item label="雷达类型"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-select v-model="radar.shape"
                      size="small">
              <a-select-option value='polygon'>
                polygon
              </a-select-option>
              <a-select-option value='circle'>
                circle
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="radar.center!==undefined">
          <a-form-item label="中心点"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <div class="flex-center-left">
              <a-input-number v-model="radar.center[0]" />
              <span>~</span>
              <a-input-number v-model="radar.center[1]" />
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="12"
               :sm="24"
               v-if="radar.radius!==undefined">
          <a-form-item label="半径"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol">
            <a-input-number v-model="radar.radius" />
          </a-form-item>
        </a-col>
      </template>
      <a-col :md="12"
             :sm="24"
             v-if="option.symbol!==undefined">
        <a-form-item label="拐点图形"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-select v-model="option.symbol"
                    size="small">
            <a-select-option v-for="symbol in symbolType"
                             :key="symbol.value">
              {{ symbol.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="option.symbolSize!==undefined">
        <a-form-item label="拐点大小"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <a-input-number v-model="option.symbolSize"
                          size="small" />
        </a-form-item>
      </a-col>
      <a-col :md="12"
             :sm="24"
             v-if="type!='all'&&option.indicator!==undefined">
        <a-form-item label="值范围"
                     :labelCol="labelCol"
                     :wrapperCol="wrapperCol">
          <div class="flex-center-left">
            <a-input-number v-model="option.indicator[0]" />
            <span>~</span>
            <a-input-number v-model="option.indicator[1]" />
          </div>
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
    },
    type: {}
  },
  data () {
    return {
      radar: this.$attrs['radar'],
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
