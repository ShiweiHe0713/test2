<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="flex-column">
        <div class="dataset-list-frame flex-row">
          <div class="dataset-list-classification flex">
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
                          @click="addDashboard" />
                </span>
              </template>
            </a-tabs>
          </div>
          <div style="padding:5px 12px">
            <a-input-search placeholder="搜索"
                            v-model='querySearch'
                            @change="onSearch" />
          </div>
        </div>
        <div class="flex flex-row">
          <template v-for='item in dashboardList'>
            <div class="dashboard-card flex-column"
                 :key="item.uuid"
                 style="width:25%;border:1px solid green">
              <div style="width:100%;height:200px"
                   class="flex-center">
                <template v-if='item.config.type=="2"'>
                  <img :src="imgHref+item.config.background"
                       alt="avatar"
                       style="width: 100%;height: 100%;" />
                </template>
                <template v-if='item.config.type=="1"'>
                  <div :style="{width:'100%',height:'100%',background:item.config&&item.config.background?item.config.background:'#ffffff'}"></div>
                </template>

              </div>
              <div>
                <a-dropdown>
                  <a class="ant-dropdown-link"
                     @click="e => e.preventDefault()">
                    <span>{{item.name}}</span>
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a @click="editDashboard(item.uuid)">编辑</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click="previewDashboard(item.uuid)">预览</a>
                    </a-menu-item>
                    <template v-if="dataset_type=='1'">
                      <a-menu-item>
                        <a @click="shareDashboard(item.id)">共享</a>
                      </a-menu-item>
                    </template>

                  </a-menu>
                </a-dropdown>
              </div>
            </div>
          </template>
        </div>
      </div>
      <dashboard-dialog v-if='visible'
                        :visible.sync="visible"
                        :dashboard='dashboard'
                        @finishSave='finishSave'></dashboard-dialog>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getDashboard, setShareStatus } from '@/api/dashboard'
import dashboardDialog from './component/dashboardDialog'
export default {
  name: '',
  components: {
    dashboardDialog
  },
  data () {
    return {
      visible: false,
      dataset_type: '1',
      querySearch: '',
      datasetList: [],
      curdataset: [],
      dashboardList: [],
      dashboard: {},
      imgHref: '',
    }
  },
  created () {
    this.init()
    this.imgHref = 'http://' + location.hostname + ':7001'
  },
  methods: {
    init () {
      getDashboard({ share: this.dataset_type }).then(res => {
        if (res && res.data) {
          this.dashboardList = []
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].config = JSON.parse(res.data[i].config)
            this.dashboardList.push(res.data[i])
          }
        }
      })
    },
    finishSave () {
      this.init()
    },
    addDashboard () {
      this.dashboard = {
        name: 'dashboard',
        config: {
          type: '1',
          background: 'red',
          opacity: 1,
        },
        share: 1,
        type: 1,
        description: '',
      }
      this.visible = true
    },
    shareDashboard (id) {

    },
    deleteDataset (id, index) {

    },
    editDashboard (id) {
      let url = '/create/' + id
      let route = this.$router.resolve({
        path: url,
        query: {}
      })
      window.open(route.href, '_blank')
    },
    shareDashboard (id) {
      setShareStatus({ uuid: id }).then(res => {
        this.init()
      })
    },
    change_dataset_type (e) {

    },
    onSearch () {
      this.init()
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
