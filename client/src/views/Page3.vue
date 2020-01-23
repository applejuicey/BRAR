<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <p class="display-2 font-weight-thin">WebApp示例</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title class="headline">二分类资料的样本量：杂交贝叶斯方法的频率统计工作特征指标</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">应用场景：单组试验，每个个体都是独立的，每个个体的结局指标（能够即时获取）为二分类变量</p>
                    <p class="subheading">示例：使用单组试验研究某药物半小时内的疗效（记为成功率p），每个个体的结局指标为二分类变量（成功、不成功），认为成功率p＞0.5则该药有效，即：</p>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs11 offset-xs1 class="text-xs-left">
                    <p class="subheading">零假设：成功率p≤0.5</p>
                    <p class="subheading">备择假设：成功率p＞0.5</p>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">
                      现假设成功率p的先验分布为Beta(1,1)；根据其他因素制定的最大样本量为Nmax，则似然函数为Bin(Nmax,p)；
                      当观察到X个成功结果时，可以计算出成功率p的后验分布为Beta(1+X,1+Nmax-X)，基于该后验分布，我们能计算出
                      此时<b><u> 备择假设：成功率p＞0.5 </u></b>出现的概率Pr，一般认为这个概率Pr＞0.95即可判断试验成功而终止试验
                    </p>
                    <p class="subheading">现在为了缩短研究而引入两次期中分析（分别在收集到50，75个结局时），由于多重比较的问题，此时我们需要调整上述的概率Pr，
                    使得整体试验的总一类错误率α<0.05（berry在其著作中提出了贝叶斯适应性设计中一类错误率α的计算方法，我们具体用R实现），据此计算出调整后的概率Pr（也作为试验成功而终止的准则）</p>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <v-text-field label="请输入模拟次数" v-model="numofsim"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <v-text-field label="请输入成功率p" v-model="truepesti"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <v-text-field label="请输入假设检验中的界值" v-model="hypop"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="orange" @click="calculatepr()">计算停止准则界值Pr</v-btn>
              <v-btn flat color="orange" @click="calculate1()">开始模拟</v-btn>
              <v-btn flat color="orange" @click="calculate()">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title class="headline">计算结果</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">X轴为备择假设大于某个值的后验概率界值，Y轴为对应的一类错误率α:</p>
                    <div id="tester1"></div>
<!--                    <div id="tester3"></div>-->
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">
                      现在试验因成功而终止的准则为「<b><u> 备择假设：成功率p＞0.5 </u></b>出现的概率Pr>{{cutoffpr || '未计算'}}」，
                      berry也提出了通过模拟试验计算功效、平均样本量、各期终止试验的概率。当用户输入不同成功率p时，
                      我们可以算得这些工作特征指标，并以成功率p为X轴、功效power为Y轴作图展示。
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">cutoff取{{cutoffpr || '未计算'}}时，不同真实治愈率p对应的频率统计工作特征指标:</p>
<!--                    <v-data-table :headers="headers" :items="desserts" class="elevation-1">-->
<!--                      <template v-slot:items="props">-->
<!--                        <td>{{ props.item.truep }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.power }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.meanss }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.sdss }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.pr50 }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.pr75 }}</td>-->
<!--                        <td class="text-xs-right">{{ props.item.pr100 }}</td>-->
<!--                      </template>-->
<!--                    </v-data-table>-->
                    <v-data-table :headers="headers1" :items="resArray" class="elevation-1">
                      <template v-slot:items="props">
                        <td>{{ props.item.resa }}</td>
                        <td>{{ props.item.restruep }}</td>
                        <td>{{ props.item.respower }}</td>
                        <td>{{ props.item.resmeanss }}</td>
                        <td>{{ props.item.ressdss }}</td>
                        <td>{{ props.item.respr50 }}</td>
                        <td>{{ props.item.respr75 }}</td>
                        <td>{{ props.item.respr100 }}</td>
                      </template>
                    </v-data-table>
                    <br>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-left">
                    <p class="subheading">X轴为真实治愈率的估计值，Y轴为对应的功效power:</p>
                    <div id="tester2"></div>
                    <div id="tester4"></div>
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
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import PageButtons from '@/components/PageButtons.vue';
  export default {
    data: () => ({
      cutoffpr: null,
      numofsim: null,
      truepesti: null,
      hypop: null,
      resa: null,
      rescutoff: null,
      respower: null,
      resmeanss: null,
      ressdss: null,
      respr50: null,
      respr75: null,
      respr100: null,
      resArray: [],
      plot4x: [],
      plot4y: [],
      headers: [
        { text: '治愈率p', value: 'truep' },
        { text: '功效power', value: 'power' },
        { text: '平均样本量', value: 'meanss' },
        { text: '标准差', value: 'sdss' },
        { text: '50例结束概率', value: 'pr50' },
        { text: '75例结束概率', value: 'pr75' },
        { text: '100例结束概率', value: 'pr100' },
      ],
      headers1: [
        { text: '一类错误α', value: 'resa' },
        { text: '治愈率p', value: 'restruep' },
        { text: '功效power', value: 'respower' },
        { text: '平均样本量', value: 'resmeanss' },
        { text: '标准差', value: 'ressdss' },
        { text: '50例结束概率', value: 'respr50' },
        { text: '75例结束概率', value: 'respr75' },
        { text: '100例结束概率', value: 'respr100' },
      ],
      desserts: [
        {
          truep: 0.50,
          power: 0.0421,
          meanss: 98.9,
          sdss: 6.9,
          pr50: 0.017,
          pr75: 0.011,
          pr100: 0.972
        },
        {
          truep: 0.55,
          power: 0.217,
          meanss: 94.7,
          sdss: 14.2,
          pr50: 0.077,
          pr75: 0.058,
          pr100: 0.864
        },
        {
          truep: 0.60,
          power: 0.578,
          meanss: 84.1,
          sdss: 21.0,
          pr50: 0.237,
          pr75: 0.162,
          pr100: 0.601
        },
        {
          truep: 0.65,
          power: 0.889,
          meanss: 69.0,
          sdss: 21.1,
          pr50: 0.504,
          pr75: 0.229,
          pr100: 0.266
        },
        {
          truep: 0.70,
          power: 0.989,
          meanss: 57.0,
          sdss: 14.2,
          pr50: 0.780,
          pr75: 0.160,
          pr100: 0.060
        },
      ]
    }),
    components: {
      PageButtons
    },
    methods: {
      calculatepr: function () {
        const TESTER1 = document.getElementById('tester1');
        this.cutoffpr = 0.976;
        const data1 = {
          x: [0.95, 0.96, 0.97, 0.9725, 0.975, 0.976, 0.9775, 0.98, 0.99],
          y: [0.0958, 0.0692, 0.0591, 0.0591, 0.0532, 0.0423, 0.0347, 0.0347, 0.0195]
        };
        const trace1 = [data1];
        Plotly.plot(TESTER1, trace1, {
          margin: { t: 0 }
        });
      },
      calculate: function () {
        let self = this;
        this.$axios.post('http://localhost:3000/a', {
          a: '1000000',
          b: '0.5',
          c: '0.5',
        },{
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(function (response) {
          let temp = response.data;
          let res = temp.split(/\r\n|\n\r|[\n\r]/);
              console.log(res);

              self.resArray.push({
                resa: res[0].split(' ')[1],
                rescutoff: res[1].split(' ')[1],
                respower: res[2].split(' ')[1],
                resmeanss: res[3].split(' ')[1],
                ressdss: res[4].split(' ')[1],
                respr50: res[7].split(' ')[0],
                respr75: res[7].split(' ')[1],
                respr100: res[7].split(' ')[2],
              });

          console.log('resArray:',self.resArray);


            }).catch(function (error) {
              console.log(error);
            });

        const TESTER1 = document.getElementById('tester1');
        const TESTER2 = document.getElementById('tester2');
        const data1 = {
          x: [0.95, 0.96, 0.97, 0.9725, 0.975, 0.976, 0.9775, 0.98, 0.99],
          y: [0.0958, 0.0692, 0.0591, 0.0591, 0.0532, 0.0423, 0.0347, 0.0347, 0.0195]
        };
        const trace1 = [data1];
        Plotly.plot(TESTER1, trace1, {
          margin: { t: 0 }
        });
        Plotly.plot(TESTER2, [{
          x: [0.5, 0.55, 0.60, 0.65, 0.70, 0.75],
          y: [0.0421, 0.217, 0.578, 0.889, 0.989, 0.999]
        }], {
          margin: { t: 0 }
        });
      },
      calculate1: function () {
        let self = this;
        const TESTER4 = document.getElementById('tester4');
        this.$axios.post('http://localhost:3000/a', {
          a: self.numofsim,
          b: self.truepesti,
          c: self.hypop,
        },{
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(function (response) {
          let temp = response.data;
          let res = temp.split(/\r\n|\n\r|[\n\r]/);
          console.log(res);

          self.resArray.push({
            resa: res[0].split(' ')[1],
            restruep: self.truepesti,
            rescutoff: res[1].split(' ')[1],
            respower: res[2].split(' ')[1],
            resmeanss: res[3].split(' ')[1],
            ressdss: res[4].split(' ')[1],
            respr50: res[7].split(' ')[0],
            respr75: res[7].split(' ')[1],
            respr100: res[7].split(' ')[2],
          });

          console.log('resArray:',self.resArray);

          self.plot4x.push(self.truepesti);
          self.plot4y.push(res[2].split(' ')[1]);
          Plotly.plot(TESTER4, [{
            x: self.plot4x,
            y: self.plot4y,
          }], {
            margin: { t: 0 }
          });

        }).catch(function (error) {
          console.log(error);
        });


      },
    },
  }
</script>

<style scoped>

</style>