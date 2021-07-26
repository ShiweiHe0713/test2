<template>
  <div class="">
    <div class="flex-row"
         style="padding:10px">
      <span class="flex">
        <span class="header-name">{{title.name}}</span>
        <a-tooltip>
          <template slot="title">
            {{title.remarks}}
          </template>
          <a-icon type="question-circle" />
        </a-tooltip>

      </span>
      <div class="flex-row flex-center">

        <template>
          <div class="flex-row flex-center"
               style="margin-left:10px">
            <a-icon type="sync"
                    class="chart-edit-icon"
                    @click="refreshChart" />
            <a-icon type="edit"
                    @click="editChart" />
            <a-dropdown>
              <a class="ant-dropdown-link"
                 @click="e => e.preventDefault()">
                <a-icon type="more"
                        class="chart-edit-icon" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="shareChart">共享</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="deleteChart">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </template>
      </div>
    </div>
    <div class="flex-row">

    </div>
  </div>
</template>
<script>
import vm from '@/event.js'
import { updateChart } from '@/api/chart'
export default {
  props: {
    title: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      chartId: this.$attrs['data']['uuid'],
    }
  },
  created () {

  },

  methods: {
    deleteChart () {
      let self = this
      this.$confirm({
        title: '请确定删除当前图表',
        onOk () {
          vm.$emit('change-dashboard-method', { method: 'deleteChart', params: { id: self.chartId } })
        },
        onCancel () {
          console.log('Cancel');
        },
      });

    },
    editChart () {
      vm.$emit('change-dashboard-method', { method: 'editChart', params: { id: this.chartId } })
    },
    refreshChart () {
      vm.$emit(this.chartId + '_change', { key: 'fresh', data: this.chartId })
    },
    shareChart () {
      updateChart({ share: 1, uuid: this.chartId }).then(res => {
        if (res) {
          this.$message.success("已经分享成功")
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.header-name {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  padding: 0 5px;
}
.chart-edit-icon {
  margin: 0 3px;
}
</style>
