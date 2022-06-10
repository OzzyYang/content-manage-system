<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body,
html,
#app {
  height: 100%;
  width: 100%;
}

.all-in-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
