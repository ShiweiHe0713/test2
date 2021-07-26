<template>
  <div>
    <div class="flex-column">
      <a-table :columns="fieldColumn"
               :rowKey="(record,index) => index+'_field'"
               :pagination="false"
               :data-source="datasource">

      </a-table>
    </div>
  </div>
</template>
<script>
import { _getFieldType } from '@/utils/util'
import { sendHttp } from '@/api/interface'
import { getAllField, getSqlData } from '@/api/dataset'

export default {
  props: {
    dataset: {}
  },
  data () {
    return {
      fieldColumn: [],
      datasource: []
    }
  },
  created () {
    if (this.dataset.uuid) {
      this.init()
    }
  },
  methods: {
    init () {
      this.getAllFieldFun()
      this.getSqlDataFun()
    },
    getSqlDataFun () {
      getSqlData({ uuid: this.dataset.uuid }).then(res => {
        if (res && res.data) {
          this.datasource = res.data
        }
      })
    },
    getAllFieldFun () {
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
            this.fieldColumn.push(header)
          }
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
