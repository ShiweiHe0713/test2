<template>
  <div class="col-table">
    <a-table
        :columns="fieldColumn"
        :rowKey="(record,index) => index+'_field'"
        :pagination="false"
        :data-source="fieldData">
        <span
        slot="fieldType"
        slot-scope="record"
        >
        <a-select v-model="record.type">
            <a-select-option v-for="field in fieldType" :key="field.value" :value="field.value">
            {{ field.label }}
            </a-select-option>
        </a-select>
        </span>
    </a-table>
  </div>
</template>

<script>

import {  fieldType } from './../common'
import moment from 'moment'
export default {
  name: '',
  props: {
    fieldColumn:{
        type:Array,
        default: ()=>{
            return []
        }
    },
    fieldData:{
        type:Array,
        default: ()=>{
            return []
        }
    }
  },
  data () {
    return {
      fieldType,
    }
  },
  methods: {
    
  }
}
</script>


