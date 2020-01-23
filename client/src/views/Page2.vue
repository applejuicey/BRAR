<template>
  <div>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs color="primary" dark slider-color="secondary">

            <v-tab :key="'BRARParametersSetup'" ripple>Protocol</v-tab>
            <v-tab-item :key="'BRARParametersSetup'">
              <v-card flat>
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
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="">Confirm</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab :key="'BRARImplentation'" ripple>Trial Control</v-tab>
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
                                <v-list-tile-content>Number of Subjects in Arm1: Current - Planned</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.calories }} - {{ props.item.sodium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Number of Subjects in Arm2: Current - Planned</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.fat }} - {{ props.item.calcium }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Probability of Last Subject Being Assigned to Arm1:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                <v-list-tile-content>Probability of Last Subject Being Assigned to Arm2:</v-list-tile-content>
                                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                              </v-list-tile>
                            </v-list>
                          </v-card>
                        </v-flex>
                      </template>
                    </v-data-iterator>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <h4>The Allocation Ratio for Each Subject (Burn-in Period)</h4>
                        <div id="graph1"></div>
                      </v-flex>
                      <v-flex xs6>
                        <h4>The Allocation Ratio for Each Subject (Dynamic Period)</h4>
                        <div id="graph2"></div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#FF5722" class="white--text" @click="">Update</v-btn>
                  <v-btn color="#FF5722" class="white--text" @click="show()">Plot</v-btn>
                    <v-btn color="#FF5722" class="white--text" @click="">NEXT!</v-btn>
                  <v-btn color="#FF5722" class="white--text" @click="">Data entry</v-btn>
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
            items: [
                {
                    name: 'The Burn-in Period (Equal Randomisation)',
                    calories: 7,
                    fat: 7,
                    carbs: 0.5,
                    protein: 0.5,
                    sodium: 7,
                    calcium: 7,
                },
                {
                    name: 'The Dynamic Period (Outcome-adaptive Randomisation)',
                    calories: 7,
                    fat: 5,
                    carbs: 0.58,
                    protein: 0.42,
                    sodium: '?',
                    calcium: '?',
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
                    name: "to Arm1",
                    type: 'scatter',
                };
                const trace2 = {
                    x:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
                    y:[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
                    name: "to Arm2",
                    type: 'scatter',
                };
                const trace3 = {
                    x:[15,16,17,18,19,20,21,22,23,24,25,26],
                    y:[0.51,0.53,0.53,0.54,0.55,0.54,0.55,0.55,0.56,0.57,0.58,0.58],
                    name: "to Arm1",
                    type: 'scatter',
                };
                const trace4 = {
                    x:[15,16,17,18,19,20,21,22,23,24,25,26],
                    y:[0.49,0.47,0.47,0.46,0.45,0.46,0.45,0.45,0.44,0.43,0.42,0.42],
                    name: "to Arm2",
                    type: 'scatter',
                };
                const layout = {
                    showlegend: true,
                    xaxis: {
                        title: 'Subject Number'
                    },
                    yaxis: {
                        title: 'Allocation Probability'
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