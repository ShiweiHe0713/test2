<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="flex-row">
        <div class="dataset-list-frame">
          <div class="dataset-list-classification">
            <a-tabs v-model="dataset_type"
                    @change="change_dataset_type"
                    :size="'small'">
              <a-tab-pane key="0"
                          tab="公共">
              </a-tab-pane>
              <a-tab-pane key="1"
                          tab="我的">

              </a-tab-pane>
              <template slot="tabBarExtraContent">
                <span style="padding:0 12px">
                  <a-icon type="plus"
                          @click="addExcel" />
                </span>
              </template>
            </a-tabs>
          </div>
          <div style="padding:5px 12px">
            <a-input-search placeholder="搜索"
                            v-model='querySearch'
                            @change="onSearch" />
          </div>
          <div style="padding:0 12px 100px 12px;overflow:auto"
               class="flex">
            <ul class="dataset-list-ul">
              <template v-for='(item,index) in datasetList'>
                <li :key='index+"_dataset"'
                    class="dataset-list-li flex-row flex-center-left">
                  <div class='flex'
                       @click="gotoDetail(item)">
                    <span>{{item.name}}</span>
                  </div>
                  <span class="delete-icon">
                    <a-icon type="delete"
                            @click="deleteDataset(item.uuid,index)" />
                  </span>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="flex">
          <dateset-detail :dataset='curdataset'
                          :key='curdataset.uuid'></dateset-detail>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getDataSetlist, getAllField, getAllExceldata } from '@/api/dataset'
import datesetDetail from './index'
export default {
  name: '',
  components: {
    datesetDetail
  },
  data () {
    return {
      dataset_type: '0',
      querySearch: '',
      datasetList: [],
      curdataset: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getDataSetlist({ type: 'excel', share: this.dataset_type }).then(res => {
        if (res && res.data) {
          this.datasetList = res.data
        }
      })
    },
    deleteDataset (id, index) {

    },
    gotoDetail (record) {
      this.curdataset = record

    },
    addExcel () {
      this.curdataset = {}
    },
    change_dataset_type (e) {
      this.init()
    },
    onSearch () {

    },

  },
  watch: {

  }
}
</script>
<style lang="less" scoped>
.dataset-list-ul {
  margin: 10px 0;
  padding: 0;
  .dataset-list-li {
    height: 32px;
    cursor: pointer;
    .delete-icon {
      display: none;
    }
    &:hover {
      background: #1890ff;
      color: #ffffff;
      .delete-icon {
        display: block;
      }
    }
  }
}
</style>
