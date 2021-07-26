<template>
  <div class="dashboard-header flex-center-left">
    <span>{{this.dashboard.name}}</span>
    <a-tooltip>
      <template slot="title">
        编辑看板
      </template>
      <a-icon type="edit"
              @click="()=>{this.visible=true}" />
    </a-tooltip>
    <dashboard-dialog v-if='visible'
                      :visible.sync="visible"
                      :dashboard='dashboard'></dashboard-dialog>
  </div>
</template>
<script>
import dashboardDialog from './component/dashboardDialog'
export default {
  props: {
    dashboard: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  components: {
    dashboardDialog
  },
  watch: {

  },
  data () {
    return {
      visible: false
    }
  },
  created () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.dashboard-header {
  height: 30px;
}
</style>
