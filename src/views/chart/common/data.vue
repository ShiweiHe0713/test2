<template>
  <div class="flex-column">
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
      <a-form-item label="数据源类型">
        <a-select default-value="lucy" style="width: 120px">
          <a-select-option value="inface">
            接口
          </a-select-option>
          <a-select-option value="mysql">
            MySql
          </a-select-option>
        </a-select>
        <a-form-item label="接口">
          <a-select default-value="lucy" style="width: 120px" >
            <a-select-option value="inface">
              接口
            </a-select-option>
            <a-select-option value="mysql">
              MySql
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form-item>
    </a-form>
    <div class="flex flex-column">
      <div class="flex flex-row">
        <div class="flex">
          <div>
            <span>维度</span>
          </div>
          <ul>
            <li v-for="(dimension,index) in dimensions" :key="index+'_dimension'">{{ dimension.name }}</li>
          </ul>
        </div>
        <div class="flex">
          <div>
            <a-select default-value="x" style="width: 50px">
              <a-select-option value="x">
                X
              </a-select-option>
              <a-select-option value="y">
                Y
              </a-select-option>
            </a-select>
            <span>坐标轴</span>
          </div>

        </div>
      </div>
      <div class="flex flex-row">
        <di v class="flex">
          <div>
            <span>指标</span>
          </div>
          <ul>
            <li v-for="(measure,index) in measures" :key="index+'_dimension'">{{ measure.name }}</li>
          </ul>
        </di></div>
      <div class="flex">
        <div>
          <span>值</span>
        </div>
        <ul>
          <li v-for="(dimension,index) in dimensions" :key="index+'_dimension'">{{ dimension.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    components: {
    },
    data () {
        return {
            dimensions: [],
            measures: []
        }
    },
    mounted () {

    },
    created () {

    },

    beforeDestroy () {
    },
    methods: {

    }
}
</script>
