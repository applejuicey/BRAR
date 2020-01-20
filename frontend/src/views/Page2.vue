<template>
  <div>

    <v-tabs right slider-color="deep-orange">
      <v-tab>
        <v-icon>add</v-icon>研究内容与方法1
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">先验分布的确定</p>
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
                    先验信息来源：专家经验、预试验结果、既往类似试验结果等
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    确定先验分布主要涉及两个方面的内容：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    1.确定先验分布的类型
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    2.确定先验分布所含的未知参数(即超参数)：矩法、分位数法等
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    主要拟研究结局指标为率/二分类变量的临床试验，可以借助beta-binomial共轭分析
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab>
        <v-icon>add</v-icon>研究内容与方法2
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">样本量的确定</p>
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
                    研究二分类资料的固定样本量确定方法：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    1.基于容忍区间、最大或平均后验方差、平均覆盖概率、平均覆盖长度、HPD区间等准则
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    2.与同类别频率统计样本量计算方法相比较
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    3.使用多种准则得出的结果之间比较
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    研究二分类资料的非固定样本量确定方法：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    1.给出α、β、平均样本量、在每次期中分析时终止试验的概率
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    2.与相应的频率统计方法比较
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    3.考虑适应性随机化流程
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="headline">
                    <v-icon>navigate_next</v-icon>&nbsp;
                    使用R进行统计编程：
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    1.研究如何用R实现这些计算，参考相应R包(SampleSizeBinomial)
                  </p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs11 offset-xs1 class="text-xs-left">
                  <p class="headline">
                    2.两条路；研究如何使用JS传入用户指定的参数，接收计算结果并展现
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab>
        <v-icon>add</v-icon>技术路线
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <p class="display-2">技术路线</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <br><br>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-left">
                  <v-img :src="require('../assets/1.png')" ></v-img>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4 offset-xs8 class="text-xs-left">
                  <page-buttons></page-buttons>
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
  }
</script>

<style scoped>

</style>