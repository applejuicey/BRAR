<template>
  <div>
    <v-btn flat color="deep-orange" @click="previousPage()">上一页</v-btn>
    <v-btn flat color="deep-orange" @click="nextPage()">下一页</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {
      previousPage: function () {
        let currentRouteNumber = parseInt(this.$route.path.substr(1));
        let previousRouteNumber = currentRouteNumber - 1;
        let previousRouteName = 'page' + previousRouteNumber;
        this.$router.push({ name: previousRouteName });
      },
      nextPage: function () {
        let currentRouteNumber = parseInt(this.$route.path.substr(1));
        let nextRouteNumber = currentRouteNumber + 1;
        let nextRouteName = 'page' + nextRouteNumber;
        this.$router.push({ name: nextRouteName });
      },
    },
  }
</script>