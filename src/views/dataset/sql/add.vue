<template>
  <a-modal :visible="visible"
           cancelText="取消"
           okText="确定"
           title="编辑Mysql"
           @cancel="cancle"
           @ok="save">
    <div class="flex-column">
      <div class="dataset-mysql-detail">
        <a-form :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }">
          <a-form-item label="数据集名称">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="host">
            <a-input v-decorator="['host', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="user">
            <a-input v-decorator="['user', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="password">
            <a-input v-decorator="['password', { rules: [{ required: true, message: '' }] }]"
                     type="password" />
          </a-form-item>
          <a-form-item label="port">
            <a-input v-decorator="['port', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="database">
            <a-input v-decorator="['database', { rules: [{ required: true, message: '' }] }]" />
          </a-form-item>
          <a-form-item label="table">
            <a-select v-model='tableName'
                      allowClear
                      @change="getTables">
              <a-select-option :value="item"
                               :key='item'
                               v-for='item in tableList'>
                {{item}}
              </a-select-option>

            </a-select>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary"
                      @click="getTables">
              连接且获取表
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div>
        <a-table :columns="fieldColumn"
                 :rowKey="(record,index) => index+'_field'"
                 :pagination="false"
                 :data-source="sqlData">
          <span slot="alias"
                slot-scope="record">
            <a-input v-model='record.alias' />
          </span>
          <span slot="fieldType"
                slot-scope="record">
            <a-select v-model="record.fieldType">
              <a-select-option v-for="field in fieldChartType"
                               :key="field.value"
                               :value="field.value">
                {{ field.label }}
              </a-select-option>
            </a-select>
          </span>
        </a-table>
      </div>
    </div>
  </a-modal>

</template>
<script>
import { fieldRequestColumn, excelType, fieldType, fieldChartType } from './../common'
import { _getFieldType } from '@/utils/util'
import { sendHttp } from '@/api/interface'
import { connectSql, saveSql } from '@/api/dataset'
const fieldColumn = [
  {
    title: '表字段',
    key: 'col',
    align: 'left',
    dataIndex: 'col'
  },

  {
    title: '别名',
    key: 'alias',
    align: 'left',
    scopedSlots: { customRender: 'alias' }
  },
  {
    title: '指标/维度',
    key: 'fieldType',
    align: 'left',
    scopedSlots: { customRender: 'fieldType' }
  },
]
export default {
  props: {
    dataset: {},
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  data () {
    return {
      form: this.$form.createForm(this),
      tableList: [],
      tableName: '',
      sqlData: [],
      fieldColumn,
      fieldChartType,
    }
  },
  created () {

  },
  methods: {

    save () {

      const {
        form: { validateFields }
      } = this
      let self = this
      validateFields((err, values) => {
        debugger
        if (!err && self.tableName && self.sqlData.length > 0) {
          let name = values.name
          delete values.name
          saveSql({ param: { ...values, tableName: this.tableName }, name, field: this.sqlData }).then(res => {
            if (res.code == 0) {
              this.$message.success("保存成功")
              this.$emit("update:visible", false)
            } else {
              this.$message.error(res.message)
            }

          })
        }
      })


    },
    cancle () {
      this.$emit("update:visible", false)
    },
    setSqlField (data) {
      this.sqlData = []
      debugger
      for (let i = 0; i < data.length; i++) {
        let field = {
          name: data[i].Field,
          col: data[i].Field,
          alias: data[i].Field,
          fieldType: data[i].Type && (data[i].Type.indexOf("int") >= 0 || data[i].Type.indexOf("double") >= 0) ? 'measure' : 'dimension'
        }
        this.sqlData.push(field)
      }
    },
    getTables () {
      const {
        form: { validateFields }
      } = this
      debugger
      validateFields((err, values) => {
        if (!err) {
          connectSql({ param: { ...values }, tableName: this.tableName }).then(res => {
            if (res.code == 1) {
              this.$message.error(res.message)
              return
            }
            if (res && res.data) {
              if (this.tableName) {
                this.setSqlField(res.data)
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  this.tableList.push(res.data[i].table_name)
                }
                this.tableName = this.tableList[0]
                if (this.tableName) {
                  this.getTables()
                }
              }

            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.interface-config {
  & > div {
    margin: 15px 0;
  }
}
</style>
