<template>
  <div class="flex-row flex-center"
       style="height:40px">
    <div class="flex-row flex-start flex">
      <template v-if="type==='string'">
        <div class="color-react">
          <colorPicker v-model="value"
                       ref='testColor' />
        </div>

      </template>
      <template v-if="type==='linear'||type==='radial'">
        <div v-for="(item,index) in valueList"
             :key="index+'_color'"
             class="color-react">
          <colorPicker :value="item"
                       @change="changeCurColor($event,index)"
                       :ref="'index_color_'+index" />
          <a-icon v-if="valueList.length>2"
                  type="close-circle"
                  class="close-icon"
                  @click='removeColor (index)' />
        </div>
        <a-tooltip>
          <template slot="title">
            增加实现渐变
          </template>
          <a-icon type="plus"
                  @click="addColor" />
        </a-tooltip>

      </template>
    </div>

    <template v-if="type==='linear'||type==='radial'">
      <a-select v-model="defaultDirection"
                style="width: 90px"
                size="small">
        <a-select-option v-for="(item,index) in linearList"
                         :key="index+'_linear'"
                         :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
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
  props: { color: {}, index: {} },
  data () {
    return {
      first: true,
      type: 'string',
      value: '',
      valueList: [],
      defaultDirection: '',
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
      linearType: {
        '1000': {
          x: 1,
          y: 0,
          x2: 0,
          y2: 0
        },
        '0001': {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1
        },
        '0010': {
          x: 0,
          y: 0,
          x2: 1,
          y2: 0
        },
        '0100': {
          x: 0,
          y: 1,
          x2: 0,
          y2: 0
        }
      }
    }
  },
  watch: {
    defaultDirection: {
      handler (val, oldVal) {
        this.changeColor()
      }
    },
    value: {
      handler (val, oldVal) {
        if (this.first) {
          if (this.$listeners['changeColor']) {
            this.$emit('changeColor', { index: this.index, color: val })
          }
          this.$emit('input', val)
          this.$forceUpdate()
        }

      }
    },
    valueList: {
      handler (val, oldVal) {

        if (this.type !== 'string') {
          this.changeColor()
        }
      },
      deep: true
    }
  },
  created () {
    this.first = false
    if (this.color && this.color.type && this.color.type === 'linear') {
      this.type = 'linear'
      this.valueList = []
      const colorStops = this.color.colorStops
      for (let i = 0; i < colorStops.length; i++) {
        this.valueList.push(colorStops[i].color)
      }
      this.defaultDirection = this.color.x + '' + this.color.y + '' + this.color.x2 + '' + this.color.y2 + ''
    } else if (this.color && this.color.type && this.color.type === 'radial') {
      this.type = 'radial'
      this.valueList = []
      const colorStops = this.color.colorStops
      for (let i = 0; i < colorStops.length; i++) {
        this.valueList.push(colorStops[i].color)
      }
    } else {
      this.value = this.color
    }
    setTimeout(() => {
      this.first = true
    })
  },
  methods: {
    changeColor () {
      if (this.type != 'string') {
        const colorStops = []
        for (let i = 0; i < this.valueList.length; i++) {
          const offset = i * 1 / (this.valueList.length - 1)
          colorStops.push({
            offset,
            color: this.valueList[i]
          })
        }
        const color = {
          type: this.type,
          colorStops,
          ...this.linearType[this.defaultDirection]
        }
        if (this.$listeners['changeColor']) {
          this.$emit('changeColor', { index: this.index, color, })
        }
        this.$emit('input', color)

      }
      this.$forceUpdate()
    },
    addColor () {
      if (this.type === 'string') {
        this.type = 'linear'
        this.valueList[0] = this.value
      }
      this.valueList.push(this.valueList[this.valueList.length - 1])
      this.$forceUpdate()
    },

    removeColor (index) {
      this.valueList.splice(index, 1)
      if (this.valueList.length === 1) {
        this.type = 'string'
        this.value = this.valueList[0]
      }
    },
    changeCurColor (value, index) {
      this.valueList[index] = value
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="less" scoped>
.color-react {
  margin: 0 5px;

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
</style>