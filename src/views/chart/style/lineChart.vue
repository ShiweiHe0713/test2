<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="基础样式">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3" disabled>
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ['1']
    }
  }
}
</script>
