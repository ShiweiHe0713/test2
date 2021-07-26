<template>
  <div class="flex-column"
       style="height: 100%;max-width:100%;overflow:auto">
    <div class="flex">
      <a-tabs>
        <template v-for="(sheet,index) in sheets">
          <a-tab-pane :key="index+'-sheet'"
                      :tab="sheet.name">
            <div style="margin:10px">
              <a-tabs type="card">
                <a-tab-pane key="数据列表"
                            tab="数据列表">
                  <a-table :columns="sheet.header"
                           :rowKey="(record,index) => index"
                           :pagination="false"
                           :data-source="sheet.data">
                  </a-table>
                </a-tab-pane>
                <a-tab-pane key="数据字段信息"
                            tab="数据字段信息">
                  <a-table :columns="fieldColumn"
                           :rowKey="(record,index) => index+'_field'"
                           :pagination="false"
                           :data-source="sheet.field">
                    <span slot="fieldType"
                          slot-scope="record">
                      <a-select v-model="record.type"
                                @change="changeType($event,record)">
                        <a-select-option v-for="field in fieldType"
                                         :key="field.value"
                                         :value="field.value">
                          {{ field.label }}
                        </a-select-option>
                      </a-select>
                    </span>
                    <span slot="size"
                          slot-scope="record">
                      <a-input v-model="record.size" />
                    </span>
                  </a-table>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { fieldColumn, excelType, fieldType, letter } from './../common'
import moment from 'moment'
import { saveExcel, getAllField, getAllExceldata } from '@/api/dataset'
export default {
  name: '',
  props: {
    dataset: {}
  },
  data () {
    return {
      sheets: [{ name: '', data: [], header: [], field: [], datasetName: '' }],
      fieldColumn,
      excelType,
      fieldType,
      letter,
      visible: false,
      confirmLoading: false,
    }
  },
  created () {
    if (this.dataset.uuid) {
      this.init()
    }

  },
  methods: {
    changeType (e, record) {

    },
    async init () {
      this.sheets[0] = { name: this.dataset.name, data: [], header: [], field: [], datasetName: this.dataset.name }
      getAllField({ datasetUuid: this.dataset.uuid }).then(res => {
        if (res && res.data) {
          for (let i = 0; i < res.data.length; i++) {
            const header = {
              title: res.data[i]['alias'],
              key: res.data[i]['col'],
              align: 'left'
            }
            if (res.data[i].type === 'datetime') {
              header.customRender = (text, row, index) => {
                return {
                  children: moment(text).format('YYYY-MM-DD hh:mm:ss')
                }
              }
            } else {
              header.dataIndex = res.data[i]['col']
            }
            this.sheets[0].header.push(header)
          }
          this.sheets[0].field = res.data
          this.$forceUpdate()
        }

      })
      getAllExceldata({ tableName: this.dataset.tableName }).then(res => {
        this.sheets[0].data = res.data
        this.$forceUpdate()
      })
    },
    showModal () {
      if (this.sheets.length > 0) {
        this.visible = true;
      } else {
        this.$message.warn("没有数据需要保存")
      }

    },
    handleOk (e) {
      this.saveData()
    },
    handleCancel (e) {

      this.visible = false;
    },
    handleUpload (file, fileList) {
      this.sheets = []
      for (let i = 0; i < fileList.length; i++) {
        this.readExcel(fileList[i])
      }
      return false
    },
    getColName (index) {
      if (index <= 26) {
        return this.letter[index % this.letter.length]
      } else {
        return this.letter[parseInt(index % this.letter.length)] + (index % this.letter.length)
      }
    },
    saveData () {
      for (let i = 0; i < this.sheets.length; i++) {
        const data = this.sheets[i].data
        const field = this.sheets[i].field
        const param = {
          data,
          field,
          table: {
            name: this.sheets[i].datasetName,
            type: 'excel'
          }
        }
        saveExcel(param).then((res) => {
          if (res && res.data) {
            this.dataset.uuid = res.data
          }
        }).catch(error => {

        })
        this.visible = false;
      }
    },
    createHeader (val, headers, fields, fieldType) {
      let i = 0
      for (const key in val) {
        let type = 'varchar'
        if (fieldType[this.letter[i % this.letter.length] + '3']) {
          type = this.excelType[fieldType[this.letter[i % this.letter.length] + '3']['t']]
        }
        const field = {
          name: key,
          col: this.getColName(i),
          alias: key,
          type: type,
          fieldType: type == 'varchar' ? 'dimension' : 'measure',
          size: 254,
          isNull: '0'
        }
        const header = {
          title: key,
          key: key,
          align: 'left'
        }
        if (type === 'datetime') {
          header.customRender = (text, row, index) => {
            return {
              children: moment(text).format('YYYY-MM-DD hh:mm:ss')
            }
          }
        } else {
          header.dataIndex = key
        }
        i++
        fields.push(field)
        headers.push(header)
      }
    },
    readExcel (files) {
      var that = this
      that.excelList = []
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary',
            cellDates: true
          })
          const wsname = workbook.SheetNames
          for (let i = 0; i < wsname.length; i++) {
            const name = wsname[i]
            const sheet = { name: name, data: [], header: [], field: [], datasetName: name }
            const worksheet = workbook.Sheets[name]
            const ws = XLSX.utils.sheet_to_json(worksheet)
            this.createHeader(ws[0], sheet.header, sheet.field, worksheet)

            ws.shift()
            sheet.data = ws
            this.sheets.push(sheet)
          }
        } catch (e) {
          console.info(e)
        }
      }
      fileReader.readAsBinaryString(files)
    }
  }
}
</script>

<style  lang="less">
.input-file {
  display: none;
}
.dataset-upload {
  .ant-upload-list {
    &.ant-upload-list-text {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }
  }
}
</style>
