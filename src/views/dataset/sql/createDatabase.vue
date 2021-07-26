<template>
  <a-modal :visible="visible"
           cancelText="取消"
           okText="确定"
           title="数据库设置"
           @cancel="cancle"
           :confirmLoading='confirmLoading'
           @ok="save">
    <div class="flex-column">
      <div class="dataset-mysql-detail"
           style="width:300">
        <a-form :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
          <a-form-item label="host">
            <a-input v-decorator="['host', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="user">
            <a-input v-decorator="['user', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="password">
            <a-input v-decorator="['password', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="port">
            <a-input v-decorator="['port', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="database">
            <a-input v-decorator="['database', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary">
              连接测试
            </a-button>
          </a-form-item>
        </a-form>
      </div>
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
    field: {
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
      fieldName: '',
    }
  },
  created () {

  },
  computed: {

  },
  mounted () {

  },

  methods: {

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
</style>
