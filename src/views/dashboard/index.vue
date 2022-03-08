<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">欢迎您: {{ name }}</div>-->
      <img src="@/assets/welcome/welcome.jpg" width="100%" height="100%"></img>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    created() {
      return null
    }
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--.dashboard {-->
<!--  &-container {-->
<!--    margin: 30px;-->
<!--  }-->
<!--  &-text {-->
<!--    font-size: 30px;-->
<!--    line-height: 46px;-->
<!--  }-->
<!--}-->
</style>
