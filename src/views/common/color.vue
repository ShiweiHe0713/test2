<template>
  <colorPicker v-model="color" />
</template>
<script>
import vcolorpicker from 'vcolorpicker'
  export default {
    components: {
        vcolorpicker
    },
    data () {
      return {
        color: '#ff0000'
      }
    }
  }
</script>
