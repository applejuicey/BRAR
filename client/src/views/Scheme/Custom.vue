<template>
  <div>

    <section id="custom" class="bg-light py-5">
      <div class="overlay custom-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-12">

            <h5 class="subtitle">{{ $t('custom.instruction') }}</h5>
            <h3>{{ $t('custom.title') }}</h3>
            <ul class="my-4">
              <li>
                <i class="fas fa-caret-right"></i>&nbsp;
                {{ $t('custom.detail1') }}
              </li>
            </ul>

            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-12 form-group">
                    <label for="schemeName">
                      {{ $t('custom.schemeNameHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.schemeNameInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="schemeName" :placeholder="$t('custom.schemeNameHolder')"
                           id="schemeName" required>
                  </div>
                </div>
              </div>
            </div>

            <p>
              {{ $t('custom.section1Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.section1Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-12 form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="decisionStrategy1" value="decisionStrategy1" v-model="decisionStrategy">
                      <label class="form-check-label" for="decisionStrategy1">
                        {{ $t('custom.decisionStrategy1') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.decisionStrategy1Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="decisionStrategy2" value="decisionStrategy2" v-model="decisionStrategy">
                      <label class="form-check-label" for="decisionStrategy2">
                        {{ $t('custom.decisionStrategy2') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.decisionStrategy2Instruction')"></i>
                      </label>
                    </div>
                    <ul class="my-2">
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        {{ $t('custom.earlyDropDefinition') }}
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        {{ $t('custom.earlyWinnerDefinition') }}
                      </li>
                      <li>
                        <i class="fas fa-caret-right"></i>&nbsp;
                        {{ $t('custom.finalWinnerDefinition') }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="earlyDropThreshold">
                      {{ $t('custom.earlyDropThresholdHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.earlyDropThresholdInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="earlyDropThreshold" :placeholder="$t('custom.earlyDropThresholdHolder')"
                           id="earlyDropThreshold" required>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="earlyWinnerThreshold">
                      {{ $t('custom.earlyWinnerThresholdHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.earlyWinnerThresholdInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="earlyWinnerThreshold" :placeholder="$t('custom.earlyWinnerThresholdHolder')"
                           id="earlyWinnerThreshold" required>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="finalWinnerThreshold">
                      {{ $t('custom.finalWinnerThresholdHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.finalWinnerThresholdInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="finalWinnerThreshold" :placeholder="$t('custom.finalWinnerThresholdHolder')"
                           id="finalWinnerThreshold" required>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="clinicalSignificanceThreshold">
                      {{ $t('custom.clinicalSignificanceThresholdHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.clinicalSignificanceThresholdInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="clinicalSignificanceThreshold" :placeholder="$t('custom.clinicalSignificanceThresholdHolder')"
                           id="clinicalSignificanceThreshold" required>
                  </div>
                  <div class="col-md-6 form-group" v-show="decisionStrategy === 'decisionStrategy2'">
                    <label for="clinicalSignificanceValue">
                      {{ $t('custom.clinicalSignificanceValueHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.clinicalSignificanceValueInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="clinicalSignificanceValue" :placeholder="$t('custom.clinicalSignificanceValueHolder')"
                           id="clinicalSignificanceValue" required>
                  </div>
                </div>
              </div>
            </div>

            <p>
              {{ $t('custom.section2Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.section2Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-12 form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod1" value="constructionMethod1" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod1">
                        {{ $t('custom.constructionMethod1') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod1Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod2" value="constructionMethod2" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod2">
                        {{ $t('custom.constructionMethod2') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod2Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod3" value="constructionMethod3" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod3">
                        {{ $t('custom.constructionMethod3') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod3Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod4" value="constructionMethod4" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod4">
                        {{ $t('custom.constructionMethod4') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod4Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod5" value="constructionMethod5" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod5">
                        {{ $t('custom.constructionMethod5') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod5Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="constructionMethod6" value="constructionMethod6" v-model="constructionMethod">
                      <label class="form-check-label" for="constructionMethod6">
                        {{ $t('custom.constructionMethod6') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.constructionMethod6Instruction')"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
              {{ $t('custom.section3Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.section3Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-12 form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="adjustmentMethod1" value="adjustmentMethod1" v-model="adjustmentMethod">
                      <label class="form-check-label" for="adjustmentMethod1">
                        {{ $t('custom.adjustmentMethod1') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.adjustmentMethod1Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="adjustmentMethod2" value="adjustmentMethod2" v-model="adjustmentMethod">
                      <label class="form-check-label" for="adjustmentMethod2">
                        {{ $t('custom.adjustmentMethod2') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.adjustmentMethod2Instruction')"></i>
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="adjustmentMethod3" value="adjustmentMethod3" v-model="adjustmentMethod">
                      <label class="form-check-label" for="adjustmentMethod3">
                        {{ $t('custom.adjustmentMethod3') }}
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.adjustmentMethod3Instruction')"></i>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6 form-group" v-show="adjustmentMethod.includes('adjustmentMethod1')">
                    <label for="burnInBlockNumber">
                      {{ $t('custom.burnInBlockNumberHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.burnInBlockNumberInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="burnInBlockNumber" :placeholder="$t('custom.burnInBlockNumberHolder')"
                           id="burnInBlockNumber" required>
                  </div>
                  <div class="col-md-6 form-group" v-show="adjustmentMethod.includes('adjustmentMethod1')">
                    <label for="burnInBlockLength">
                      {{ $t('custom.burnInBlockLengthHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.burnInBlockLengthInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="burnInBlockLength" :placeholder="$t('custom.burnInBlockLengthHolder')"
                           id="burnInBlockLength" required>
                  </div>
                  <div class="col-md-6 form-group" v-show="adjustmentMethod.includes('adjustmentMethod2')">
                    <label for="tuningParameterType">
                      {{ $t('custom.tuningParameterTypeHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.tuningParameterTypeInstruction')"></i>
                    </label>
                    <select class="form-control form-control-lg" v-model="tuningParameterType"
                            id="tuningParameterType" required>
                      <option value="fixed">{{ $t('custom.tuningParameterType1') }}</option>
                      <option value="adapted">{{ $t('custom.tuningParameterType2') }}</option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group" v-show="adjustmentMethod.includes('adjustmentMethod2') && tuningParameterType === 'fixed'">
                    <label for="tuningParameterValue">
                      {{ $t('custom.tuningParameterValueHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.tuningParameterValueInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="tuningParameterValue" :placeholder="$t('custom.tuningParameterValueHolder')"
                           id="tuningParameterValue" required>
                  </div>
                  <div class="col-md-6 form-group" v-show="adjustmentMethod.includes('adjustmentMethod3')">
                    <label for="clipMethodMinimumThreshold">
                      {{ $t('custom.clipMethodMinimumThresholdHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.clipMethodMinimumThresholdInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="clipMethodMinimumThreshold" :placeholder="$t('custom.clipMethodMinimumThresholdHolder')"
                           id="clipMethodMinimumThreshold" required>
                  </div>
                </div>
              </div>
            </div>

            <p>
              {{ $t('custom.section4Title') }}
              <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.section4Instruction')"></i>
            </p>
            <div class="row">
              <div class="col-12 m-auto">
                <div class="row">
                  <div class="col-12 form-group">
                    <label for="armNumber">
                      {{ $t('custom.armNumberHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.armNumberInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="armNumber" :placeholder="$t('custom.armNumberHolder')"
                           id="armNumber" required>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="adaptiveBlockNumber">
                      {{ $t('custom.adaptiveBlockNumberHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.adaptiveBlockNumberInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="adaptiveBlockNumber" :placeholder="$t('custom.adaptiveBlockNumberHolder')"
                           id="adaptiveBlockNumber" required>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for="adaptiveBlockLength">
                      {{ $t('custom.adaptiveBlockLengthHolder') }}&nbsp;
                      <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('custom.adaptiveBlockLengthInstruction')"></i>
                    </label>
                    <input type="text" class="form-control form-control-lg" v-model="adaptiveBlockLength" :placeholder="$t('custom.adaptiveBlockLengthHolder')"
                           id="adaptiveBlockLength" required>
                  </div>
                  <template v-for="(arm, index) in parseInt(armNumber) || null">
                    <div class="col-md-6 form-group">
                      <label :for="`arm${arm}BetaPriorParameterA`">
                        {{ `Arm ${arm} beta prior parameter 'a'` }}&nbsp;
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="`Please fill in the beta prior parameter 'a' of arm ${arm} here.`"></i>
                      </label>
                      <input type="text" class="form-control form-control-lg" v-model="betaPriorParameterA[index]" :placeholder="`Arm ${arm} beta prior parameter 'a'`"
                             :id="`arm${arm}BetaPriorParameterA`" required>
                    </div>
                    <div class="col-md-6 form-group">
                      <label :for="`arm${arm}BetaPriorParameterB`">
                        {{ `Arm ${arm} beta prior parameter 'b'` }}&nbsp;
                        <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="`Please fill in the beta prior parameter 'b' of arm ${arm} here.`"></i>
                      </label>
                      <input type="text" class="form-control form-control-lg" v-model="betaPriorParameterB[index]" :placeholder="`Arm ${arm} beta prior parameter 'b'`"
                             :id="`arm${arm}BetaPriorParameterB`" required>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <div class="row my-5">
              <div class="col-12 m-auto text-center">
                <div class="btn-group btn-group-lg">
                  <button class="btn btn-hero" @click="submit" data-toggle="tooltip" data-placement="top" :title="$t('type1.submitInstruction')">
                    {{ $t('custom.submit') }}
                  </button>
                  <button class="btn btn-primary" @click="loadExample" data-toggle="tooltip" data-placement="top" :title="$t('type1.loadExampleInstruction')">
                    {{ $t('custom.loadExample') }}
                  </button>
                  <button class="btn btn-secondary" @click="navigate('homepage')" data-toggle="tooltip" data-placement="top" :title="$t('type1.homeInstruction')">
                    {{ $t('custom.home') }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <modal :modalID="modalID" :modalTitle="modalTitle" :modalType="modalType"
           :modalConfirmButtonClass="modalConfirmButtonClass" @modalConfirmation="processModalConfirmation"
           :customParameters="customParameters">
      <template v-slot:modalBody v-if="['submit'].includes(modalType)">
        <span>
          {{ modalMessage }}
        </span>
      </template>
    </modal>

  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue';
  export default {
    components: {
      Modal
    },
    data: () => ({
      modalID: null,
      modalTitle: null,
      modalType: null,
      modalConfirmButtonClass: null,
      customParameters: null,
      modalMessage: null,
      schemeName: null,
      decisionStrategy: 'decisionStrategy1',
      earlyDropThreshold: null,
      earlyWinnerThreshold: null,
      finalWinnerThreshold: null,
      clinicalSignificanceThreshold: null,
      clinicalSignificanceValue: null,
      constructionMethod: 'constructionMethod2',
      adjustmentMethod: ['adjustmentMethod1', 'adjustmentMethod2', 'adjustmentMethod3'],
      burnInBlockNumber: null,
      burnInBlockLength: null,
      tuningParameterType: 'fixed',
      tuningParameterValue: null,
      clipMethodMinimumThreshold: null,
      armNumber: null,
      adaptiveBlockNumber: null,
      adaptiveBlockLength: null,
      betaPriorParameterA: [],
      betaPriorParameterB: [],
    }),
    created: function () {

    },
    methods: {
      submit: function () {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'submitSchemeModal';
          this.modalTitle = this.$i18n.t('custom.submitSchemeModalTitle');
          this.modalType = 'submit';
          this.modalConfirmButtonClass = 'btn-hero';
          this.customParameters = {
            // subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'custom.submitSchemeModalMessage',
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#submitSchemeModal').modal('show');
        });

        // let self = this;
        // this.$axios.post('http://localhost:3000/rscripts/type1', {
        //
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json;charset=utf-8'
        //   }
        // }).then(function (response) {
        //
        // }).catch(function (error) {
        //   self.responseModalMessage = 'damn';
        //   $('#responseModal').modal('show');
        //   console.log(error);
        // });

      },
      loadExample: function () {
        this.schemeName = 'Example Scheme ' + new Date().getTime();
        this.earlyDropThreshold = 0.01;
        this.earlyWinnerThreshold = 0.99;
        this.finalWinnerThreshold = 0.95;
        this.clinicalSignificanceThreshold = 0;
        this.clinicalSignificanceValue = 0.2;
        this.burnInBlockNumber = 10;
        this.burnInBlockLength = 5;
        this.tuningParameterValue = 0.5;
        this.clipMethodMinimumThreshold = 0.1;
        this.armNumber = 3;
        this.adaptiveBlockNumber = 40;
        this.adaptiveBlockLength = 5;
        this.betaPriorParameterA = [1, 1, 1];
        this.betaPriorParameterB = [1, 1, 1];
      },
      navigate: function (routerName) {
        this.$router.push({
          name: routerName,
        });
      },
      processModalConfirmation: function (modelType, customParameters) {
        switch (modelType) {
          case 'submit':
            console.log(
                'submit',
                this.subjectInitials,
                this.subjectGender,
            );
            break;
        }
      },
    },
  }
</script>

<style scoped>
  #custom {
    background: url("https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80");
    background-size: cover;
    position: relative;
  }
  .custom-overlay {
    background: white;
    opacity: .95;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>