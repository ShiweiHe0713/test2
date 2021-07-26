<template>
  <div class="base-style">
    <a-collapse v-model="activeKey"
                accordion>
      <a-collapse-panel key="1"
                        v-if="option.grid!==undefined">
        <template slot="header">
          图表边框距
          <a-tooltip>
            <template slot="title">
              <span>支持百分比、正整数、left、center、right、top、middle、bottom</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </template>
        <a-form>
          <a-row :gutter="10">
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="top"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input v-model="option.grid.top"
                         size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="bottom"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input v-model="option.grid.bottom"
                         size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="left"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input v-model="option.grid.left"
                         size="small" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="right"
                           :labelCol="labelCol"
                           :wrapperCol="wrapperCol">
                <a-input v-model="option.grid.right"
                         size="small" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel key="2"
                        v-if="headerTitle!==undefined">
        <template slot="header">
          标题
        </template>
        <title-style :option="headerTitle"></title-style>
      </a-collapse-panel>
      <a-collapse-panel key="3"
                        v-if="option.legend!==undefined">
        <template slot="header">
          图例
          <a-tooltip>
            <template slot="title">
              <span>图例位置支持百分比、正整数、left、center、right、top、middle、bottom</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </template>
        <legend-style :option="option.legend"></legend-style>
      </a-collapse-panel>
      <a-collapse-panel key="4">
        <template slot="header">
          全局图例设置
          <a-tooltip>
            <template slot="title">
              <span>修改此处会影响全局设置,请谨慎修改</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </template>
        <legend-style :option='option'></legend-style>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { labelCol, wrapperCol } from '@/utils/config'
import titleStyle from './titleStyle'
import legendStyle from './legendStyle'
export default {
  components: {
    titleStyle,
    legendStyle
  },
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
      labelCol,
      wrapperCol,
      activeKey: ['1'],
      headerTitle: ''
    }
  },
  created () {
    this.headerTitle = this.$attrs['chartData']['title']
  },
  methods: {
    change (key) {
      if (key && key.length > 0) {
        this.activeKey = [key[key.length - 1]]
      } else {
        this.activeKey = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.base-style {
  .ant-collapse-content-box {
    overflow: auto;
  }
}
</style>
