<template>
  <div id="userLayout"
       :class="['user-layout-wrapper', 'mobile']">

  </div>
</template>

<script>

export default {
  name: 'UserLayout',

  mounted () {
    //document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    //document.body.classList.remove('userLayout')
  }
}
</script>

