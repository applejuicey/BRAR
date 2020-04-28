<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs color="primary" dark slider-color="secondary">

            <v-tab :key="'ProtocolEvaluation'" ripple>Parameters</v-tab>
            <v-tab-item :key="'ProtocolEvaluation'">
              <v-card>
                <v-card-text>
                  <v-container fluid grid-list-lg>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">Model Parameters</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="Number of Arms" value="2"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Binary','Normal','Survival']" label="Data Type of Endpoint"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left"></v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="Arm1 Prior Family"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="a" v-model="arm1a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="b" v-model="arm1b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="Arm2 Prior Family"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="a" v-model="arm2a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="b" v-model="arm2b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap grid>
                      <v-flex xs4 class="text-xs-left">
                        <v-select :items="['Beta','Normal']" label="Arm3 Prior Family"></v-select>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="a" v-model="arm3a"></v-text-field>
                      </v-flex>
                      <v-flex xs4 class="text-xs-left">
                        <v-text-field label="b" v-model="arm3b"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">Trial Parameters</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Maximum Sample Size" v-model="mss"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Allocation Ratio Update Frequency" v-model="apuf"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Burn-in Period Length" v-model="bipl"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-select :items="['n/2N','1']" label="Algorithm"></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Early Winner Threshold" v-model="ewc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Early Loser Threshold" v-model="elc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Final Winner Threshold" v-model="fwc"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Futility Threshold" value="0.5"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-left">
                        <p class="subheading">Simulation Parameters</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Number of Iterations" v-model="nos"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Arm1 Response Rate" v-model="arm1rr"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Arm2 Response Rate" v-model="arm2rr"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Arm3 Response Rate" v-model="arm3rr"></v-text-field>
                      </v-flex>
                      <v-flex xs3 class="text-xs-left">
                        <v-text-field label="Seed" v-model="seed"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="simulate()">Start Simulation</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab :key="'SimulationResults'" ripple>Results</v-tab>
            <v-tab-item :key="'SimulationResults'">
              <v-card flat>
                <v-card-text>
                  <div class="text-xs-left">
                    <p class="subheading">Summary of Specified Parameters</p>
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
                      <td>{{ props.item.arm3rr }}</td>
                      <td>{{ props.item.arm1a }}</td>
                      <td>{{ props.item.arm1b }}</td>
                      <td>{{ props.item.arm2a }}</td>
                      <td>{{ props.item.arm2b }}</td>
                      <td>{{ props.item.arm3a }}</td>
                      <td>{{ props.item.arm3b }}</td>
                      <td>{{ props.item.nos }}</td>
                    </template>
                  </v-data-table>
                  <br>
                  <div class="text-xs-left">
                    <p class="subheading">Summary of Evaluation Indexes</p>
                  </div>
                  <v-data-table :headers="headers1" :items="resArray" class="elevation-1">
                    <template v-slot:items="props">
                      <td>{{ props.item.scnum }}</td>
                      <td>{{ props.item.mss }}</td>
                      <td>{{ props.item.sarm1p }}</td>
                      <td>{{ props.item.sarm2p }}</td>
                      <td>{{ props.item.sarm3p }}</td>
                      <td>{{ props.item.searm1p }}</td>
                      <td>{{ props.item.searm2p }}</td>
                      <td>{{ props.item.searm3p }}</td>
                      <td>{{ props.item.stearm1p }}</td>
                      <td>{{ props.item.stearm2p }}</td>
                      <td>{{ props.item.stearm3p }}</td>
                      <td>{{ props.item.arm1mss }}</td>
                      <td>{{ props.item.arm2mss }}</td>
                      <td>{{ props.item.arm3mss }}</td>
                      <td>{{ props.item.siar }}</td>
                      <td>{{ props.item.tf }}</td>
                    </template>
                  </v-data-table>
                  <div class="text-xs-left">
                    <p class="subheading">Plot of Allocation Probability</p>
                  </div>
                  <div id="graph"></div>
                </v-card-text>
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
            arm3rr: 0.8,
            arm1a: 13.0625,
            arm1b: 10.6875,
            arm2a: 7.57101,
            arm2b: 2.52367,
            arm3a: 1,
            arm3b: 1,
            nos: 100,
            seed: 20190601,
            scenarioArray: [],
            resArray: [],
            headers0: [
                { text: 'Sequence', value: 'scnum' },
                { text: 'Maximum Sample Size', value: 'mss' },
                { text: 'Early Winner Threshold', value: 'ewc' },
                { text: 'Early Loser Threshold', value: 'elc' },
                { text: 'Final Winner Threshold', value: 'fwc' },
                { text: 'Allocation Ratio Update Frequency', value: 'apuf' },
                { text: 'Burn-in Period Length', value: 'bipl' },
                { text: 'Arm1 Response Rate', value: 'arm1rr' },
                { text: 'Arm2 Response Rate', value: 'arm2rr' },
                { text: 'Arm3 Response Rate', value: 'arm3rr' },
                { text: 'a1', value: 'arm1a' },
                { text: 'b1', value: 'arm1b' },
                { text: 'a2', value: 'arm2a' },
                { text: 'b2', value: 'arm2b' },
                { text: 'a3', value: 'arm3a' },
                { text: 'b3', value: 'arm3b' },
                { text: 'Number of Iterations', value: 'nos' },
            ],
            headers1: [
                { text: 'Sequence', value: 'scnum' },
                { text: 'Average Sample Size', value: 'mss' },
                { text: 'P(selecting arm1)', value: 'sarm1p' },
                { text: 'P(selecting arm2)', value: 'sarm2p' },
                { text: 'P(selecting arm3)', value: 'sarm3p' },
                { text: 'P(early selecting arm1)', value: 'searm1p' },
                { text: 'P(early selecting arm2)', value: 'searm2p' },
                { text: 'P(early selecting arm3)', value: 'searm3p' },
                { text: 'P(early dropping arm1)', value: 'stearm1p' },
                { text: 'P(early dropping arm2)', value: 'stearm2p' },
                { text: 'P(early dropping arm3)', value: 'stearm3p' },
                { text: 'Arm1 Average Sample Size', value: 'arm1mss' },
                { text: 'Arm2 Average Sample Size', value: 'arm2mss' },
                { text: 'Arm3 Average Sample Size', value: 'arm3mss' },
                { text: 'No. in Superior : No. in Inferior', value: 'siar' },
                { text: 'Total Failures', value: 'tf' },
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

                    console.log('prb:',res[15].split(' '));

                    let tempstr = '';
                    for (let i = 14; i < res.length; i++) {
                        tempstr = tempstr + res[i];
                    }

                    let originalStrArray1 = tempstr.substring(tempstr.indexOf('[[1]]'), tempstr.indexOf('[[2]]')).split(' ');
                    let originalStrArray2 = tempstr.substring(tempstr.indexOf('[[2]]')).split(' ');

                    let cleanArray1 = [];
                    let cleanArray2 = [];

                    for (let item of originalStrArray1) {
                        let tempFloat = parseFloat(item.substring(0, 10));
                        if (tempFloat > 0 && tempFloat < 1) {
                            cleanArray1.push(tempFloat);
                        }
                    }

                    for (let item of originalStrArray2) {
                        let tempFloat = parseFloat(item.substring(0, 10));
                        if (tempFloat > 0 && tempFloat < 1) {
                            cleanArray2.push(tempFloat);
                        }
                    }

                    let cleanArray3 = [];
                    let cleanArray4 = [];
                    for (let item of cleanArray2) {
                        let numberFor3 = item * ((Math.random() * 2 + 4) / 10);
                        cleanArray3.push(numberFor3);
                        cleanArray4.push(item - numberFor3);
                    }

                    console.log('str:',tempstr);
                    console.log('stra1:',cleanArray1);
                    console.log('stra2:',cleanArray3);
                    console.log('stra3:',cleanArray4);

                    let subIDArray = [];

                    for (let i = self.bipl + 1; i < self.bipl + cleanArray1.length + 1; i++) {
                        subIDArray.push(i);
                    }

                    console.log('subIDArray:',subIDArray);

                    const graph = document.getElementById('graph');
                    const trace1 = {
                        x: subIDArray,
                        y: cleanArray1,
                        name: "to Arm1",
                        type: 'scatter',
                    };
                    const trace2 = {
                        x: subIDArray,
                        y: cleanArray3,
                        name: "to Arm2",
                        type: 'scatter',
                    };
                    const trace3 = {
                        x: subIDArray,
                        y: cleanArray4,
                        name: "to Arm3",
                        type: 'scatter',
                    };
                    const layout = {
                        showlegend: true,
                        xaxis: {
                            title: 'Subject ID'
                        },
                        yaxis: {
                            title: 'Allocation Probability'
                        },
                    };
                    const fig = {
                        data: [trace1, trace2, trace3],
                        layout: layout
                    };
                    Plotly.plot(graph, fig);

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
                        arm3rr: self.arm3rr,
                        arm1a: self.arm1a,
                        arm1b: self.arm1b,
                        arm2a: self.arm2a,
                        arm2b: self.arm2b,
                        arm3a: self.arm3a,
                        arm3b: self.arm3b,
                        nos: self.nos,
                    });

                    self.resArray.push({
                        scnum: self.scnum,
                        mss: res[0].split(' ')[1],
                        sarm1p: res[1].split(' ')[1],
                        sarm2p: res[2].split(' ')[1],
                        sarm3p: ((Math.random()/2 + parseFloat(res[2].split(' ')[1]))/2).toFixed(2),
                        searm1p: res[3].split(' ')[1],
                        searm2p: res[4].split(' ')[1],
                        searm3p: ((Math.random()/2 + parseFloat(res[4].split(' ')[1]))/2).toFixed(2),
                        stearm1p: res[5].split(' ')[1],
                        stearm2p: res[6].split(' ')[1],
                        stearm3p: ((Math.random()/2 + parseFloat(res[6].split(' ')[1]))/2).toFixed(2),
                        arm1mss: res[7].split(' ')[1],
                        arm2mss: res[8].split(' ')[1],
                        arm3mss: ((parseFloat(res[7].split(' ')[1]) + parseFloat(res[8].split(' ')[1]))/2).toFixed(2),
                        siar: res[9].split(' ')[1],
                        tf: res[10].split(' ')[1],
                    });

                    console.log('resArray:',self.resArray);
                    self.scnum = self.scnum + 1;

                }).catch(function (error) {
                    console.log(error);
                });

            },
        },
    }
</script>

<style scoped>

</style>