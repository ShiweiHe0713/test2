<template>
  <div>
    <template v-for='filter in filters'>
      <div :key='filter.uuid'
           class="flex-row">
        <div><span>{{filter.alias+":"}}</span></div>
        <template v-if='(filter.additional.filter.type+"-"+filter.additional.filter.operator)=="input-like"'>
          <a-input v-model="filter.additional.filter.value[0]" />
        </template>
        <template v-if='(filter.additional.filter.type+"-"+filter.additional.filter.operator)=="select-in"'>
          <a-select v-model='filter.additional.filter.value'
                    style="width: 120px"
                    @dropdownVisibleChange="dropdownVisibleChange($event,filter)">

          </a-select>
        </template>
        <template v-if='(filter.additional.filter.type+"-"+filter.additional.filter.operator)=="input-in"'>
          <a-input-number v-model="filter.additional.filter.value[0]" />
          ~
          <a-input-number v-model="filter.additional.filter.value[1]" />
        </template>
        <template v-if='(filter.additional.filter.type+"-"+filter.additional.filter.operator)=="datatime-in"'>
          <a-range-picker :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                          show-time
                          format="YYYY/MM/DD HH:mm:ss"
                          @change="onChange" />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    filters: [],
  },
  components: {

  },
  watch: {

  },
  data () {
    return {

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
<style lang="less" >
</style>
