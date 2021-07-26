<template>
  <div style="position:relative">
    <div :style="divColor"
         class="color-bar"></div>
    <div class="flex-column">
      <div class="flex-row flex-center-left">
        <a-checkbox v-model='gradual'>
          渐变
        </a-checkbox>
        <a-select v-model="gradualType"
                  @change="changeGradualType"
                  style="width: 90px"
                  size="small">
          <a-select-option v-for="(item,index) in linearList"
                           :key="index+'_linear'"
                           :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="flex-row flex-center-left">
        <template v-if="colorType== 'string'">
          <div class="color-react"
               :style="{'backgroundColor':color}"
               @click='changeColor(0)'></div>
        </template>
        <template v-else>
          <div class="color-react"
               v-for="(item,index) in gradualList"
               :key="index+'_react'"
               :style="{'backgroundColor':item}"
               @click='changeColor(index)'>
            <a-icon v-if="gradualList.length>2"
                    type="close-circle"
                    class="close-icon"
                    @click='reduceColor(index)' />

          </div>
          <a-icon type="plus"
                  @click="addColor" />
        </template>
      </div>
    </div>
    <template>
      <div class="color-frame">
        <input type="color"
               class="color-picker"
               ref="html5Color"
               v-model="html5Color"
               @change="updataValue(html5Color)">

      </div>

    </template>
  </div>

</template>
<script>
export default {
  model: {
    prop: 'color'
  },
  components: {
  },
  props: { color: {} },
  data () {
    return {
      gradual: false,
      gradualType: '1000',
      colorType: 'string',
      selectedIndex: 0,
      divColor: {
        backgroundColor: ''
      },
      html5Color: '#ffffff',
      gradualList: [],
      linearList: [
        {
          value: '1000',
          label: '从右到左'
        },
        {
          value: '0001',
          label: '从上到下'
        },
        {
          value: '0010',
          label: '从左到右'
        },
        {
          value: '0100',
          label: '从下到上'
        }
      ],
    }
  },
  watch: {

  },
  created () {
    this.initColor()
  },
  methods: {
    changeGradualType (e) {
      if (e.target.checked) {
        this.colorType = 'linear'
        let color = this.color
        this.color = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: color // 0% 处的颜色
          }, {
            offset: 1, color: color // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      } else {
        this.colorType = 'string'
        this.color = this.gradualList[0]
      }
      this.initColor()
    },
    initColor () {
      if (Object.prototype.toString.call(this.color) === "[object Object]") {
        if (this.color.type === 'linear') {
          this.gradual = true
          this.colorType = 'linear'
          this.gradualList = []
          const colorStops = this.color.colorStops
          for (let i = 0; i < colorStops.length; i++) {
            this.gradualList.push(colorStops[i].color)
          }
          this.gradualType = this.color.x + '' + this.color.y + '' + this.color.x2 + '' + this.color.y2 + ''
        } else if (this.color.type === 'radial') {
          this.gradual = true
          this.colorType = 'radial'
          this.gradualList = []
          const colorStops = this.color.colorStops
          for (let i = 0; i < colorStops.length; i++) {
            this.gradualList.push(colorStops[i].color)
          }
        }
      } else {
        this.gradual = false
      }
    },
    showPicker () {
      this.$refs.html5Color.click()
    },
    changeColor (index) {
      if (this.colorType != 'string') {
        this.selectedIndex = index
        this.html5Color = this.gradualList[index]
      } else {
        this.html5Color = this.color
      }
      this.$refs.html5Color.click()
    },
    reduceColor (index) {
      this.gradualList.splice(index, 1)
      this.$forceUpdate()
    },
    addColor () {
      this.gradualList.push(this.gradualList[this.gradualList.length - 1])
      this.$forceUpdate()
    },
    updataValue (value) {
      if (this.colorType != 'string') {
        this.gradualList[this.selectedIndex] = value
      } else {
        this.color = value
      }
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="less" scoped>
.color-bar {
  width: 100px;
  height: 15px;
}
.color-react {
  margin: 5px;
  width: 15px;
  height: 15px;
  position: relative;
  &:hover {
    .close-icon {
      display: inline-block;
    }
  }
  .close-icon {
    display: none;
    position: absolute;
    top: -8px;
    right: -8px;
  }
}
.color-frame {
  color: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 100px;
  background: #ffffff;

  width: 240px;
  padding: 260px 0 20px 0;
  border: 1px dashed #d9d9d9;
  .color-picker {
    position: absolute;
    top: 0;
    left: 2px;
    opacity: 0;
    height: 0;
    width: 0;
  }
}
</style>