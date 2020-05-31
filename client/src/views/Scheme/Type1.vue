<template>
  <div>

    <section class="bg-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">

            <h5 class="subtitle">{{ $t('type1.instruction') }}</h5>
            <h3>{{ $t('type1.title') }}</h3>
            <ul class="my-4">
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                {{ $t('type1.detail1') }}
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                {{ $t('type1.detail2') }}
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                {{ $t('type1.detail3') }}
              </li>
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                {{ $t('type1.detail4') }}
              </li>
            </ul>

            <p>
              {{ $t('type1.section1Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('type1.section1Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label for="armNumber">{{ $t('type1.armNumberHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="armNumber" :placeholder="$t('type1.armNumberHolder')"
                           id="armNumber" required data-toggle="tooltip" data-placement="top" :title="$t('type1.armNumberInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="adaptiveBlockNumber">{{ $t('type1.adaptiveBlockNumberHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="adaptiveBlockNumber" :placeholder="$t('type1.adaptiveBlockNumberHolder')"
                           id="adaptiveBlockNumber" required data-toggle="tooltip" data-placement="top" :title="$t('type1.adaptiveBlockNumberInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="adaptiveBlockLength">{{ $t('type1.adaptiveBlockLengthHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="adaptiveBlockLength" :placeholder="$t('type1.adaptiveBlockLengthHolder')"
                           id="adaptiveBlockLength" required data-toggle="tooltip" data-placement="top" :title="$t('type1.adaptiveBlockLengthInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="clinicalSignificanceThreshold">{{ $t('type1.clinicalSignificanceThresholdHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="clinicalSignificanceThreshold" :placeholder="$t('type1.clinicalSignificanceThresholdHolder')"
                           id="clinicalSignificanceThreshold" required data-toggle="tooltip" data-placement="top" :title="$t('type1.clinicalSignificanceThresholdInstruction')">
                  </div>
                  <template v-for="(arm, index) in parseInt(armNumber) || null">
                    <div class="col-md-6 form-group">
                      <label :for="`arm${arm}BetaPriorParameterA`">{{ `Arm ${arm} beta prior parameter 'a'` }}</label>
                      <input type="text" class="form-control form-control-lg" v-model="betaPriorParameterA[index]" :placeholder="`Arm ${arm} beta prior parameter 'a'`"
                             :id="`arm${arm}BetaPriorParameterA`" required data-toggle="tooltip" data-placement="top" :title="`Please fill in the beta prior parameter 'a' of arm ${arm} here.`">
                    </div>
                    <div class="col-md-6 form-group">
                      <label :for="`arm${arm}BetaPriorParameterB`">{{ `Arm ${arm} beta prior parameter 'b'` }}</label>
                      <input type="text" class="form-control form-control-lg" v-model="betaPriorParameterB[index]" :placeholder="`Arm ${arm} beta prior parameter 'b'`"
                             :id="`arm${arm}BetaPriorParameterB`" required data-toggle="tooltip" data-placement="top" :title="`Please fill in the beta prior parameter 'b' of arm ${arm} here.`">
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <p>
              {{ $t('type1.section2Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('type1.section2Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label for="earlyDropThreshold">{{ $t('type1.earlyDropThresholdHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="earlyDropThreshold" :placeholder="$t('type1.earlyDropThresholdHolder')"
                           id="earlyDropThreshold" required data-toggle="tooltip" data-placement="top" :title="$t('type1.earlyDropThresholdInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="earlyWinnerThreshold">{{ $t('type1.earlyWinnerThresholdHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="earlyWinnerThreshold" :placeholder="$t('type1.earlyWinnerThresholdHolder')"
                           id="earlyWinnerThreshold" required data-toggle="tooltip" data-placement="top" :title="$t('type1.earlyWinnerThresholdInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="finalWinnerThreshold">{{ $t('type1.finalWinnerThresholdHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="finalWinnerThreshold" :placeholder="$t('type1.finalWinnerThresholdHolder')"
                           id="finalWinnerThreshold" required data-toggle="tooltip" data-placement="top" :title="$t('type1.finalWinnerThresholdInstruction')">
                  </div>
                </div>
              </div>
            </div>

            <p>
              {{ $t('type1.section3Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('type1.section3Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label for="burnInBlockNumber">{{ $t('type1.burnInBlockNumberHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="burnInBlockNumber" :placeholder="$t('type1.burnInBlockNumberHolder')"
                           id="burnInBlockNumber" required data-toggle="tooltip" data-placement="top" :title="$t('type1.burnInBlockNumberInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="burnInBlockLength">{{ $t('type1.burnInBlockLengthHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="burnInBlockLength" :placeholder="$t('type1.burnInBlockLengthHolder')"
                           id="burnInBlockLength" required data-toggle="tooltip" data-placement="top" :title="$t('type1.burnInBlockLengthInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="tuningParameterType">{{ $t('type1.tuningParameterTypeHolder') }}</label>
                    <select class="form-control form-control-lg" v-model="tuningParameterType"
                            id="tuningParameterType" required data-toggle="tooltip" data-placement="top" :title="$t('type1.tuningParameterTypeInstruction')">
                      <option value="1">{{ $t('type1.tuningParameterType1') }}</option>
                      <option value="2">{{ $t('type1.tuningParameterType2') }}</option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group" v-if="tuningParameterType == 1">
                    <label for="tuningParameterValue">{{ $t('type1.tuningParameterValueHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="tuningParameterValue" :placeholder="$t('type1.tuningParameterValueHolder')"
                           id="tuningParameterValue" required data-toggle="tooltip" data-placement="top" :title="$t('type1.tuningParameterValueInstruction')">
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="clipMethodMinimumThreshold">{{ $t('type1.clipMethodMinimumThresholdHolder') }}</label>
                    <input type="text" class="form-control form-control-lg" v-model="clipMethodMinimumThreshold" :placeholder="$t('type1.clipMethodMinimumThresholdHolder')"
                           id="clipMethodMinimumThreshold" required data-toggle="tooltip" data-placement="top" :title="$t('type1.clipMethodMinimumThresholdInstruction')">
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-5">
              <div class="col-12 m-auto text-center">
                <div class="btn-group btn-group-lg">
                  <button class="btn btn-hero" @click="submit" data-toggle="tooltip" data-placement="top" :title="$t('type1.submitInstruction')">
                    {{ $t('type1.submit') }}
                  </button>
                  <button class="btn btn-primary" @click="loadExample" data-toggle="tooltip" data-placement="top" :title="$t('type1.loadExampleInstruction')">
                    {{ $t('type1.loadExample') }}
                  </button>
                  <button class="btn btn-secondary" @click="navigate('homepage')" data-toggle="tooltip" data-placement="top" :title="$t('type1.homeInstruction')">
                    {{ $t('type1.home') }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  export default {
    data: () => ({
      armNumber: null,
      adaptiveBlockNumber: null,
      adaptiveBlockLength: null,
      clinicalSignificanceThreshold: null,
      betaPriorParameterA: [],
      betaPriorParameterB: [],
      earlyDropThreshold: null,
      earlyWinnerThreshold: null,
      finalWinnerThreshold: null,
      burnInBlockNumber: null,
      burnInBlockLength: null,
      tuningParameterType: null,
      tuningParameterValue: null,
      clipMethodMinimumThreshold: null,
    }),
    components: {},
    created: function () {

    },
    methods: {
      submit: function () {
        let self = this;
        this.$axios.post('http://localhost:3000/rscripts/type1', {
          a: self.armNumber,
          b: self.burnInBlockNumber,
          c: self.burnInBlockLength,
          d: self.adaptiveBlockNumber,
          e: self.adaptiveBlockLength,
          f: self.generalisationBlockLength,
          g: self.patientHorizon,
          h: self.earlyDropThreshold,
          i: self.earlyWinnerThreshold,
          j: self.finalWinnerThreshold,
          k: self.clinicalSignificanceThreshold,
          l: self.trueResponseRateCoefficient,
          m: self.trueResponseRateConstant,
          n: self.betaPriorParameterA,
          o: self.betaPriorParameterB,
          p: self.simulationIterationNumber,
          q: self.randomSeed,
          r: self.clipMethodMinimumThreshold,
          s: self.tuningParameterType,
          t: self.tuningParameterValue,
        }, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(function (response) {
          let temp = response.data;
          // let res = temp.split(/\r\n|\n\r|[\n\r]/);
          // console.log(res);
          //
          // console.log('prb:', res[15].split(' '));
          //
          // let tempstr = '';
          // for (let i = 14; i < res.length; i++) {
          //   tempstr = tempstr + res[i];
          // }
          //
          // let originalStrArray1 = tempstr.substring(tempstr.indexOf('[[1]]'), tempstr.indexOf('[[2]]')).split(' ');
          // let originalStrArray2 = tempstr.substring(tempstr.indexOf('[[2]]')).split(' ');
          //
          // let cleanArray1 = [];
          // let cleanArray2 = [];
          //
          // for (let item of originalStrArray1) {
          //   let tempFloat = parseFloat(item.substring(0, 10));
          //   if (tempFloat > 0 && tempFloat < 1) {
          //     cleanArray1.push(tempFloat);
          //   }
          // }
          //
          // for (let item of originalStrArray2) {
          //   let tempFloat = parseFloat(item.substring(0, 10));
          //   if (tempFloat > 0 && tempFloat < 1) {
          //     cleanArray2.push(tempFloat);
          //   }
          // }
          // let cleanArray3 = [];
          // let cleanArray4 = [];
          // for (let item of cleanArray2) {
          //   let numberFor3 = item * ((Math.random() * 2 + 4) / 10);
          //   cleanArray3.push(numberFor3);
          //   cleanArray4.push(item - numberFor3);
          // }
          //
          // console.log('str:',tempstr);
          // console.log('stra1:',cleanArray1);
          // console.log('stra2:',cleanArray3);
          // console.log('stra3:',cleanArray4);
          //
          // let subIDArray = [];
          //
          // for (let i = self.bipl + 1; i < self.bipl + cleanArray1.length + 1; i++) {
          //   subIDArray.push(i);
          // }
          //
          // console.log('subIDArray:', subIDArray);
          //
          // const graph = document.getElementById('graph');
          // const trace1 = {
          //   x: subIDArray,
          //   y: cleanArray1,
          //   name: "to Arm1",
          //   type: 'scatter',
          // };
          // const trace2 = {
          //   x: subIDArray,
          //   y: cleanArray2,
          //   name: "to Arm2",
          //   type: 'scatter',
          // };
          // const layout = {
          //   showlegend: true,
          //   xaxis: {
          //     title: 'Subject ID'
          //   },
          //   yaxis: {
          //     title: 'Allocation Probability'
          //   },
          // };
          // const fig = {
          //   data: [trace1, trace2],
          //   layout: layout
          // };
          // Plotly.plot(graph, fig);
          //
          // self.scenarioArray.push({
          //   scnum: self.scnum,
          //   mss: self.mss,
          //   ewc: self.ewc,
          //   elc: self.elc,
          //   fwc: self.fwc,
          //   apuf: self.apuf,
          //   bipl: self.bipl,
          //   arm1rr: self.arm1rr,
          //   arm2rr: self.arm2rr,
          //   arm3rr: self.arm3rr,
          //   arm1a: self.arm1a,
          //   arm1b: self.arm1b,
          //   arm2a: self.arm2a,
          //   arm2b: self.arm2b,
          //   arm3a: self.arm3a,
          //   arm3b: self.arm3b,
          //   nos: self.nos,
          // });
          //
          // self.resArray.push({
          //   scnum: self.scnum,
          //   mss: res[0].split(' ')[1],
          //   sarm1p: res[1].split(' ')[1],
          //   sarm2p: res[2].split(' ')[1],
          //   sarm3p: ((Math.random() / 2 + parseFloat(res[2].split(' ')[1])) / 2).toFixed(2),
          //   searm1p: res[3].split(' ')[1],
          //   searm2p: res[4].split(' ')[1],
          //   searm3p: ((Math.random() / 2 + parseFloat(res[4].split(' ')[1])) / 2).toFixed(2),
          //   stearm1p: res[5].split(' ')[1],
          //   stearm2p: res[6].split(' ')[1],
          //   stearm3p: ((Math.random() / 2 + parseFloat(res[6].split(' ')[1])) / 2).toFixed(2),
          //   arm1mss: res[7].split(' ')[1],
          //   arm2mss: res[8].split(' ')[1],
          //   arm3mss: ((parseFloat(res[7].split(' ')[1]) + parseFloat(res[8].split(' ')[1])) / 2).toFixed(2),
          //   siar: res[9].split(' ')[1],
          //   tf: res[10].split(' ')[1],
          // });
          //
          // console.log('resArray:', self.resArray);
          // self.scnum = self.scnum + 1;

          window.location.hash = "#schemeDetailsSection";
        }).catch(function (error) {
          console.log(error);
        });

      },
      loadExample: function () {
        this.armNumber = 3;
        this.adaptiveBlockNumber = 40;
        this.adaptiveBlockLength = 5;
        this.clinicalSignificanceThreshold = 0;
        this.betaPriorParameterA = [1, 1, 1];
        this.betaPriorParameterB = [1, 1, 1];
        this.earlyDropThreshold = 0.01;
        this.earlyWinnerThreshold = 0.99;
        this.finalWinnerThreshold = 0.95;
        this.burnInBlockNumber = 10;
        this.burnInBlockLength = 5;
        this.tuningParameterType = 1;
        this.tuningParameterValue = 0.5;
        this.clipMethodMinimumThreshold = 0.1;
      },
      navigate: function (routerName) {
        this.$router.push({
          name: routerName,
        });
      },
    },
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>