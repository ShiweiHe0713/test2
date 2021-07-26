<template>
  <div style="width:800px;margin-left:50px"
       class="interface-config">
    <div>
      <a-input v-model="name"
               placeholder="接口名称" />
    </div>
    <div class="flex-row">
      <a-select style="width: 100px"
                v-model="param.type">
        <a-select-option value="GET"
                         key="GET">
          GET
        </a-select-option>
        <a-select-option value="POST"
                         key="POST">
          POST
        </a-select-option>
      </a-select>

      <a-input v-model="param.url"
               class="flex"
               style="margin:0 20px" />
      <a-button type="primary"
                @click="sendHttpFun">
        获取数据
      </a-button>
    </div>
    <div class="interface-param">
      <a-tabs default-active-key="2">
        <a-tab-pane key="1"
                    tab="HEADER">
          <a-table :row-key="record => record.name"
                   :columns="columns"
                   :data-source="param.headers"
                   :pagination="false">
            <a slot="name"
               slot-scope="text,record">
              <a-input v-model="record.name" />
            </a>
            <a slot="value"
               slot-scope="text,record">
              <a-input v-model="record.value" />
            </a>
            <span slot="action"
                  slot-scope="text, record,index">
              <a-icon type="delete"
                      @click="deleteParam(record,index,'headers')" />
              <a-divider type="vertical" />
              <a-icon type="plus"
                      @click="addParam(record,index,'headers')" />
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2"
                    tab="BODY">
          <a-table :row-key="record => record.name"
                   :columns="columns"
                   :data-source="param.data"
                   :pagination="false">
            <a slot="name"
               slot-scope="text,record">
              <a-input v-model="record.name" />
            </a>
            <a slot="value"
               slot-scope="text,record">
              <a-input v-model="record.value" />
            </a>
            <span slot="action"
                  slot-scope="text, record,index">
              <a-icon type="delete"
                      @click="deleteParam(record,index,'data')" />
              <a-divider type="vertical" />
              <a-icon type="plus"
                      @click="addParam(record,index,'data')" />
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div style="min-height:300px;border:1px solid #d9d9d9">
      <pre>{{ data }}</pre>
    </div>
    <div class="flex-row flex-center">
      <span>通过KEY解析数据</span>
      <a-input v-model="param.transferKey"
               class="flex"
               style="margin:0 20px" />
      <a-button type="primary"
                @click="transfer">
        解析
      </a-button>
    </div>
    <div>
      <a-table :columns="fieldRequestColumn"
               :data-source="fields"
               :pagination="false">
        <a slot="name"
           slot-scope="text,record">
          {{ record.name }}
        </a>
        <a slot="alias"
           slot-scope="text,record">
          <a-input v-model="record.alias" />
        </a>
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
        <span slot="type"
              slot-scope="record">
          <a-select v-model="record.type">
            <a-select-option v-for="field in fieldType"
                             :key="field.value"
                             :value="field.value">
              {{ field.label }}
            </a-select-option>
          </a-select>
        </span>
      </a-table>
    </div>
    <div>
      <a-button type="primary"
                @click="save">
        保存
      </a-button>
    </div>
  </div>
</template>
<script>
import { fieldRequestColumn, excelType, fieldType, fieldChartType } from './../common'
import { _getFieldType } from '@/utils/util'
import { sendHttp } from '@/api/interface'
import { saveInterface, getAllField } from '@/api/dataset'

const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    width: '150px',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'VALUE',
    dataIndex: 'value',
    key: 'value',
    scopedSlots: { customRender: 'value' }
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  props: {
    dataset: {}
  },
  data () {
    return {
      fieldChartType,
      fieldType,
      data: [],
      name: '',
      columns,
      fieldRequestColumn,
      param: {
        headers: [{ name: '', value: '' }],
        transferKey: 'data',
        url: '',
        type: 'POST',
        data: [{ name: '', value: '' }]
      },
      fields: [],
      isEdit: false
    }
  },
  created () {
    if (this.dataset.uuid) {
      this.init()
    }
  },
  methods: {
    async init () {
      this.param = JSON.parse(this.dataset.param)
      getAllField({ datasetUuid: this.dataset.uuid }).then(res => {
        if (res && res.data) {
          this.fields = res.data
        }
      })
    },
    arrayToObject (params) {
      const param = {}
      for (let i = 0; i < params.length; i++) {
        if (params[i].name) {
          param[params[i].name] = params[i].value
        }
      }
      return param
    },
    sendHttpFun () {
      const data = this.param
      const param = this.arrayToObject(this.param.data)
      const headers = this.arrayToObject(this.param.headers)
      const sendParams = { ...data, data: param, headers: headers }
      sendHttp(sendParams).then((res) => {
        if (res) {
          this.data = res
          this.transfer()
        }
      })
    },
    transfer () {
      let res = JSON.parse(JSON.stringify(this.data))
      let data = {}
      const params = this.param
      if (params.transferKey) {
        const keys = params.transferKey.split('.')
        if (keys.length >= 0) {
          for (let i = 0; i < keys.length; i++) {
            res = res[keys[i]]
          }
          data = res
        }
      } else {
        data = res
      }
      this.fields = []
      if (Object.prototype.toString.call(data) === '[object Array]') {
        data = data[0]
      }
      for (const key in data) {
        const { fieldType, type } = _getFieldType(data[key])
        this.fields.push({ name: key, alias: key, col: key, fieldType, type })
      }
    },
    addParam (record, index, key) {
      this.param[key].push({ name: '', value: '' })
    },
    deleteParam (record, index, key) {
      this.param[key].splice(index, 1)
      if (this.param[key].length <= 0) {
        this.param[key].push({ name: '', value: '' })
      }
    },
    save () {
      const params = {
        name: this.name,
        param: this.param,
        field: this.fields
      }
      saveInterface(params).then(res => {
        if (res && res.data) {

        }
      })
      console.info(params)
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
