<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="基础样式" >
        <base-line :style="style"></base-line>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="" >
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3" >
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import baseLine from '../base/line'
export default {
    components: {
        baseLine
    },
    props: {
        style: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
        activeKey: ['1']
        }
    }
}
</script>
