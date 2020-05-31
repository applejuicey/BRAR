<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    props: {

    },
    created: function () {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    },
    methods: {

    }
  }
</script>

<style>
  #app {
    font-family: "Segoe UI","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
