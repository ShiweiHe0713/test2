<template>

</template>
<script>
  export default {
    components: {
    },
    props: ['color'],
    data () {
      return {
          type: 'string',
          value: '',
          valueList: []
      }
    },
    watch: {
        value: {
            handler (val, oldVal) {
                this.$emit('input', val)
            },
            deep: true
        },
        valueList: {
            handler (val, oldVal) {
                this.$emit('input', val)
            },
            deep: true
        }
    },
    created () {

    },
    methods: {
        addColor () {
            if (this.type === 'type') {
                this.type = 'array'
                this.valueList[0] = this.color
            }
            this.valueList.push('#ff0000')
        },
        getListColor () {

        },
        removeColor () {

        }
    }
  }
</script>
