<template>
  <a-modal :visible="visible"
           cancelText="取消"
           okText="确定"
           title="数值显示格式"
           @cancel="cancle"
           :confirmLoading='confirmLoading'
           @ok="save">
    <div>
      <a-form :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
              labelAlign='left'>
        <a-form-item label="格式">
          <a-radio-group :options="options"
                         :default-value="format.type"
                         @change="changeType" />
        </a-form-item>
        <a-form-item label="小数位数"
                     v-if="format.type!='default'">
          <a-input-number id="inputNumber"
                          v-model="format.value"
                          :min="0"
                          :max="5" />
        </a-form-item>

      </a-form>
    </div>
  </a-modal>
</template>
<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    format: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  components: {

  },
  watch: {

  },
  data () {
    return {
      confirmLoading: false,
      options: [
        { label: '默认值', value: 'default' },
        { label: '数值', value: 'int' },
        { label: '百分比', value: 'percent' },
      ]
    }
  },
  created () {

  },
  computed: {

  },
  mounted () {

  },

  methods: {
    changeType (e) {
      this.format.type = e.target.value
    },
    save () {
      this.$emit("update:visible", false)
    },
    cancle () {
      this.$emit("update:visible", false)
    },
  }
}
</script>
<style lang="less" scoped>
.selected-field-list {
  padding: 16px 0;
  font-size: 14px;
  font-weight: normal;
  .title-name {
    width: 100px;
  }
}
</style>
