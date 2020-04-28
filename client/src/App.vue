<template>
  <div id="app">
    <router-view/>
<!--    <v-app>-->
<!--      <v-navigation-drawer v-model="tocDrawer" fixed app>-->
<!--        <v-list dense>-->
<!--          <template v-for="item in toc" >-->
<!--            <v-list-tile @click="toPath(item.path)" :key="item.name">-->
<!--              <v-list-tile-action>-->
<!--                <v-icon>{{item.icon}}</v-icon>-->
<!--              </v-list-tile-action>-->
<!--              <v-list-tile-content>-->
<!--                <v-list-tile-title>{{item.name}}</v-list-tile-title>-->
<!--              </v-list-tile-content>-->
<!--            </v-list-tile>-->
<!--          </template>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->
<!--      <v-toolbar color="green" dark fixed app>-->
<!--        <v-toolbar-side-icon @click.stop="tocDrawer = !tocDrawer"></v-toolbar-side-icon>-->
<!--        <v-toolbar-title>Bayesian Adaptive Randomisation</v-toolbar-title>-->
<!--      </v-toolbar>-->
<!--      <v-content app>-->
<!--        <v-container fluid fill-height>-->
<!--          <v-layout justify-center align-center>-->
<!--            <v-flex text-xs-center>-->
<!--              <router-view/>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-container>-->
<!--      </v-content>-->
<!--      <v-footer color="green" dark app>-->
<!--        <v-layout justify-center row>-->
<!--          <v-flex primary text-xs-center xs12 class="white&#45;&#45;text">-->
<!--              <strong>Southeast University</strong>-->
<!--          </v-flex>-->
<!--        </v-layout>-->
<!--      </v-footer>-->
<!--    </v-app>-->
  </div>
</template>

<script>
  export default {
    data: () => ({
      tocDrawer: null,
      toc: [
        // {
        //   icon: 'arrow_forward',
        //   path: 'home',
        //   name: '首页',
        // },
        {
          icon: 'arrow_forward',
          path: 'page1',
          name: 'BRAR-BIN-Design',
        },
        {
          icon: 'arrow_forward',
          path: 'page2',
          name: 'BRAR-BIN-Apply',
        },
        // {
        //   icon: 'arrow_forward',
        //   path: 'page3',
        //   name: '案例简介',
        // },
        // {
        //   icon: 'arrow_forward',
        //   path: 'page4',
        //   name: '中期考核要求',
        // },
        // {
        //   icon: '',
        //   path: '',
        //   name: '',
        // },
      ],
    }),
    props: {

    },
    methods: {
      toPath: function (path) {
        this.$router.push({ name: path });
      },
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*background-image: url("./assets/bkg.png");*/
  /*background-size: 100% 100%;*/
}
</style>
