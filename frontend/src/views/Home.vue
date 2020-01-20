<template>
  <div class="home">

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <br><br><br><br><br>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <p class="display-2">基于Web的贝叶斯临床试验样本量设计软件开发</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <p class="headline font-weight-thin">Development of Sample Size Determination Designer for Bayesian Clinical Trials Based on Web</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <br><br>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4 offset-xs8 class="text-xs-left">
          <p class="headline">汇报学生：范扬 173420</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4 offset-xs8 class="text-xs-left">
          <p class="headline">指导老师：刘沛 教授</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4 offset-xs8 class="text-xs-left">
          <p class="headline">汇报日期：2019-04-28</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <br>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 offset-xs10 class="text-xs-left">
          <v-btn flat color="deep-orange" @click="nextPage()">下一页</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  methods: {
    nextPage: function () {
      this.$router.push({ name: 'page1' });
    }
  },
}
</script>
