<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs color="primary" dark slider-color="secondary">

            <v-tab :key="'ProtocolEvaluation'" ripple>方案模拟评价参数设定</v-tab>
            <v-tab-item :key="'ProtocolEvaluation'">
              <v-card>
                <v-card-text>
                  <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">模型参数：</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="处理组数量" value="2"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['二分类','正态','生存资料']" label="结局指标类型"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left"></v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="组1先验簇"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组1beta先验参数a" v-model="arm1a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组1beta先验参数b" v-model="arm1b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="组2先验簇"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组2beta先验参数a" v-model="arm2a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组2beta先验参数b" v-model="arm2b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">试验参数：</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="最大样本量" v-model="mss"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="分配概率更新频率" v-model="apuf"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="均衡分配期长度" v-model="bipl"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-select :items="['调节参数为n/2N','调节参数为1']" label="随机概率算法"></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="早期成功界值" v-model="ewc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="早期失败界值" v-model="elc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="最终成功界值" v-model="fwc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="无效界值" value="0.5"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">模拟参数：</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="模拟次数" v-model="nos"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="组1反应率" v-model="arm1rr"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="组2反应率" v-model="arm2rr"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="随机数种子" v-model="seed"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="simulate()">开始模拟</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab :key="'SimulationResults'" ripple>方案模拟评价试验结果</v-tab>
            <v-tab-item :key="'SimulationResults'">
              <v-card flat>
                <v-card-text>
                  <div class="text-xs-left">
                    <p class="subheading">设定参数总结表：</p>
                  </div>
                  <v-data-table :headers="headers0" :items="scenarioArray" class="elevation-1">
                    <template v-slot:items="props">
                      <td>{{ props.item.scnum }}</td>
                      <td>{{ props.item.mss }}</td>
                      <td>{{ props.item.ewc }}</td>
                      <td>{{ props.item.elc }}</td>
                      <td>{{ props.item.fwc }}</td>
                      <td>{{ props.item.apuf }}</td>
                      <td>{{ props.item.bipl }}</td>
                      <td>{{ props.item.arm1rr }}</td>
                      <td>{{ props.item.arm2rr }}</td>
                      <td>{{ props.item.arm1a }}</td>
                      <td>{{ props.item.arm1b }}</td>
                      <td>{{ props.item.arm2a }}</td>
                      <td>{{ props.item.arm2b }}</td>
                      <td>{{ props.item.nos }}</td>
                    </template>
                  </v-data-table>
                  <br>
                  <div class="text-xs-left">
                    <p class="subheading">评价参数总结表：</p>
                  </div>
                  <v-data-table :headers="headers1" :items="resArray" class="elevation-1">
                    <template v-slot:items="props">
                      <td>{{ props.item.scnum }}</td>
                      <td>{{ props.item.mss }}</td>
                      <td>{{ props.item.sarm1p }}</td>
                      <td>{{ props.item.sarm2p }}</td>
                      <td>{{ props.item.searm1p }}</td>
                      <td>{{ props.item.searm2p }}</td>
                      <td>{{ props.item.stearm1p }}</td>
                      <td>{{ props.item.stearm2p }}</td>
                      <td>{{ props.item.arm1mss }}</td>
                      <td>{{ props.item.arm2mss }}</td>
                      <td>{{ props.item.siar }}</td>
                      <td>{{ props.item.tf }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab :key="'BRARParametersSetup'" ripple>BRAR参数设定</v-tab>
            <v-tab-item :key="'BRARParametersSetup'">
              <v-card flat>
                <v-card-text>
                  <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">模型参数：</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="处理组数量" value="2"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['二分类','正态','生存资料']" label="结局指标类型"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left"></v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="组1先验簇"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组1beta先验参数a" v-model="arm1a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组1beta先验参数b" v-model="arm1b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="组2先验簇"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组2beta先验参数a" v-model="arm2a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="组2beta先验参数b" v-model="arm2b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">试验参数：</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="最大样本量" v-model="mss"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="分配概率更新频率" v-model="apuf"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="均衡分配期长度" v-model="bipl"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-select :items="['调节参数为n/2N','调节参数为1']" label="随机概率算法"></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="早期成功界值" v-model="ewc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="早期失败界值" v-model="elc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="最终成功界值" v-model="fwc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="无效界值" value="0.5"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="">确定BRAR方案参数</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab :key="'BRARImplentation'" ripple>当前入组情况及下一例受试者分配结果</v-tab>
            <v-tab-item :key="'BRARImplentation'">
              <v-card flat>
                <v-card-text>
                  <v-container fluid grid-list-md>
                    <v-data-iterator :items="items" content-tag="v-layout" row wrap>
                      <template v-slot:item="props">
                        <v-flex xs6>
                          <v-card>
                            <v-card-title>
                              <h4>{{ props.item.name }}</h4>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-tile>
                                <v-list-tile-content>当前组1受试者数量-组1计划入组数量:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.calories }}-{{ props.item.sodium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>当前组2受试者数量-组2计划入组数量:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.fat }}-{{ props.item.calcium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>上一例受试者被分配至组1概率:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>上一例受试者被分配至组2概率:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </template>
                    </v-data-iterator>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <h4>均衡入组期每例受试者分配概率</h4>
                        <div id="graph1"></div>
                      </v-flex>
                      <v-flex xs6>
                        <h4>非均衡入组期每例受试者分配概率</h4>
                        <div id="graph2"></div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="">更新分配概率</v-btn>
                  <v-btn color="#FF5722" class="white--text" @click="show()">分配概率变化曲线</v-btn>
                  <v-btn color="#FF5722" class="white--text" @click="">获得下一例受试者分配结果</v-btn>
                  <v-btn color="#FF5722" class="white--text" @click="">数据录入</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  export default {
    data: () => ({
      scnum: 1,
      mss: 60,
      ewc: 0.975,
      elc: 0.025,
      fwc: 0.9,
      apuf: 1,
      bipl: 14,
      arm1rr: 0.55,
      arm2rr: 0.7,
      arm1a: 13.0625,
      arm1b: 10.6875,
      arm2a: 7.57101,
      arm2b: 2.52367,
      nos: 100,
      seed: 20190601,
      scenarioArray: [],
      resArray: [],
      headers0: [
        { text: '场景编号', value: 'scnum' },
        { text: '最大样本量', value: 'mss' },
        { text: '早期成功界值', value: 'ewc' },
        { text: '早期失败界值', value: 'elc' },
        { text: '最终成功界值', value: 'fwc' },
        { text: '分配概率更新频率', value: 'apuf' },
        { text: '均衡分配期长度', value: 'bipl' },
        { text: '组1反应率', value: 'arm1rr' },
        { text: '组2反应率', value: 'arm2rr' },
        { text: '组1beta参数a', value: 'arm1a' },
        { text: '组1beta参数b', value: 'arm1b' },
        { text: '组2beta参数a', value: 'arm2a' },
        { text: '组2beta参数b', value: 'arm2b' },
        { text: '模拟次数', value: 'nos' },
      ],
      headers1: [
        { text: '场景编号', value: 'scnum' },
        { text: '平均样本量', value: 'mss' },
        { text: 'P(选择组1)', value: 'sarm1p' },
        { text: 'P(选择组2)', value: 'sarm2p' },
        { text: 'P(早期选择组1)', value: 'searm1p' },
        { text: 'P(早期选择组2)', value: 'searm2p' },
        { text: 'P(早期停止组1)', value: 'stearm1p' },
        { text: 'P(早期停止组2)', value: 'stearm2p' },
        { text: '组1平均样本量', value: 'arm1mss' },
        { text: '组2平均样本量', value: 'arm2mss' },
        { text: '优劣分配比', value: 'siar' },
        { text: '总失败人数', value: 'tf' },
      ],
      items: [
        {
          name: '均衡入组阶段：',
          calories: 7,
          fat: 7,
          carbs: 0.5,
          protein: 0.5,
          sodium: 7,
          calcium: 7,
        },
        {
          name: '非均衡入组阶段：',
          calories: 7,
          fat: 5,
          carbs: 0.58,
          protein: 0.42,

        },
      ],
    }),
    components: {

    },
    methods: {
      simulate: function () {
        let self = this;
        this.$axios.post('http://localhost:3000/a', {
          a: self.mss,
          b: self.ewc,
          c: self.elc,
          d: self.fwc,
          e: self.apuf,
          f: self.bipl,
          g: self.arm1rr,
          h: self.arm2rr,
          i: self.arm1a,
          j: self.arm1b,
          k: self.arm2a,
          l: self.arm2b,
          m: self.nos,
          n: self.seed,
        },{
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(function (response) {
          let temp = response.data;
          let res = temp.split(/\r\n|\n\r|[\n\r]/);
          console.log(res);

          self.scenarioArray.push({
            scnum: self.scnum,
            mss: self.mss,
            ewc: self.ewc,
            elc: self.elc,
            fwc: self.fwc,
            apuf: self.apuf,
            bipl: self.bipl,
            arm1rr: self.arm1rr,
            arm2rr: self.arm2rr,
            arm1a: self.arm1a,
            arm1b: self.arm1b,
            arm2a: self.arm2a,
            arm2b: self.arm2b,
            nos: self.nos,
          });

          self.resArray.push({
            scnum: self.scnum,
            mss: res[0].split(' ')[1],
            sarm1p: res[1].split(' ')[1],
            sarm2p: res[2].split(' ')[1],
            searm1p: res[3].split(' ')[1],
            searm2p: res[4].split(' ')[1],
            stearm1p: res[5].split(' ')[1],
            stearm2p: res[6].split(' ')[1],
            arm1mss: res[7].split(' ')[1],
            arm2mss: res[8].split(' ')[1],
            siar: res[9].split(' ')[1],
            tf: res[10].split(' ')[1],
          });

          console.log('resArray:',self.resArray);
          self.scnum = self.scnum + 1;

        }).catch(function (error) {
          console.log(error);
        });

      },
      show: function () {
        let self = this;
        const graph1 = document.getElementById('graph1');
        const graph2 = document.getElementById('graph2');
        const trace1 = {
          x:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
          y:[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
          name: "分配至组1概率",
          type: 'scatter',
        };
        const trace2 = {
          x:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
          y:[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
          name: "分配至组2概率",
          type: 'scatter',
        };
        const trace3 = {
          x:[15,16,17,18,19,20,21,22,23,24,25,26],
          y:[0.51,0.53,0.53,0.54,0.55,0.54,0.55,0.55,0.56,0.57,0.58,0.58],
          name: "分配至组1概率",
          type: 'scatter',
        };
        const trace4 = {
          x:[15,16,17,18,19,20,21,22,23,24,25,26],
          y:[0.49,0.47,0.47,0.46,0.45,0.46,0.45,0.45,0.44,0.43,0.42,0.42],
          name: "分配至组2概率",
          type: 'scatter',
        };
        const layout = {
          showlegend: true,
          xaxis: {
            title: '受试者编号'
          },
          yaxis: {
            title: '分配概率'
          },
        };
        const fig1 = {
          data: [trace1, trace2],
          layout: layout
        };
        const fig2 = {
          data: [trace3, trace4],
          layout: layout
        };
        Plotly.plot(graph1, fig1);
        Plotly.plot(graph2, fig2);
      },
    },
  }
</script>

<style scoped>

</style>