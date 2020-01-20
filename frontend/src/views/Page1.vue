<template>
  <div>

    <v-tabs right slider-color="deep-orange">
      <v-tab>
        <v-icon>add</v-icon>研究背景
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">研究背景</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <br><br>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    贝叶斯统计迅速发展：始于医疗器械临床试验
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    样本量确定是临床试验设计的关键环节：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    1.它既关系到受试产品的安全性和有效性评价，又对整个试验的耗时耗资及伦理问题影响巨大
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    2.使用基于后验分布的准则计算样本量：公式复杂、种类繁多
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    3.贝叶斯适应性设计：监管部门要求提供工作特征指标，涉及模拟；特殊的随机化过程
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    即使掌握方法，每次需要手动操作一番，且没有易于非统计专业人员理解使用的高效解决方案
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab>
        <v-icon>add</v-icon>研究目的与价值1
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">研究目的与价值：使用贝叶斯方法确定临床试验样本量</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <br><br>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    贝叶斯方法能够使用试验外部的信息：</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    比如专家经验、历史数据和其它试验的结果，减少试验的样本量以降低开销
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    先验分布：考虑无信息先验、有信息先验（定/变分度法、层次模型、幂先验）
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    固定样本量设计：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    计算后验分布
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    基于容忍区间、最大或平均后验方差、平均覆盖概率、平均覆盖长度、HPD区间等准则进行样本量的确定
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    非固定样本量设计：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    计算监管机构要求的α、β、平均样本量、最大样本量；随机化过程
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab>
        <v-icon>add</v-icon>研究目的与价值2
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">研究目的与价值：开发配套样本量确定软件</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <br><br>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    使用R语言进行统计编程和数学计算：</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    固定样本量：结合不同准则（ACC、ALC、WOC、HPD区间等），确定相应样本量
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    非固定样本量：模拟多次临床试验，计算工作特征指标，结合考虑随机化设计，确定相应样本量
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    使用网络编程技术或R构建体验良好的交互式WebApp：</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    允许用户在任何有浏览器的可访问因特网的设备上（比如台式电脑、手机、平板等）使用
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    仅需要回答一些容易理解的问题
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    使理论研究兑现其实际应用价值，极大地削减了用户整个过程中的各种成本</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <br>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4 offset-xs8 class="text-xs-left">
                  <v-btn flat color="deep-orange" @click="homePage()">上一页</v-btn>
                  <v-btn flat color="deep-orange" @click="nextPage()">下一页</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
  import PageButtons from '@/components/PageButtons.vue';
  export default {
    data: () => ({

    }),
    components: {
      PageButtons
    },
    methods: {
      homePage: function () {
        this.$router.push({ name: 'home' });
      },
      nextPage: function () {
        this.$router.push({ name: 'page2' });
      },
    },
  }
</script>

<style scoped>

</style>