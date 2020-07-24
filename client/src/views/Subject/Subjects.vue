<template>
  <div>

    <section id="subjects" class="py-5 max-height row align-items-center">
      <div class="overlay subjects-overlay"></div>
      <div class="container-fluid container-fluid-supporter">

        <div class="row">
          <div class="col-12">
            <h3 class="mt-5 mb-4 text-center">{{ $t('subjects.title') }}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12 table-responsive custom-height">
            <table class="table table-striped table-hover text-center" data-toggle="table" data-height="200">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">{{ $t('subjects.subjectScreeningID') }}</th>
                <th scope="col">{{ $t('subjects.subjectID') }}</th>
                <th scope="col">{{ $t('subjects.subjectDrugID') }}</th>
                <th scope="col">{{ $t('subjects.subjectSpareDrugID') }}</th>
                <th scope="col">{{ $t('subjects.subjectGroup') }}</th>
                <th scope="col">{{ $t('subjects.subjectInitials') }}</th>
                <th scope="col">{{ $t('subjects.subjectGender') }}</th>
                <th scope="col">{{ $t('subjects.subjectEnterDate') }}</th>
                <th scope="col">{{ $t('subjects.subjectMedicationProgress') }}</th>
                <th scope="col">{{ $t('subjects.subjectRandomisationStatus') }}</th>
                <th scope="col">{{ $t('subjects.subjectResponse') }}</th>
                <th scope="col">{{ $t('subjects.actions') }}</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(subject, key) in subjectList">
                <tr>
                  <th scope="row">{{ key + 1 }}</th>
                  <td>{{ subject.subjectScreeningID }}</td>
                  <td>{{ subject.subjectID }}</td>
                  <td>{{ subject.subjectDrugID }}</td>
                  <td>{{ subject.subjectSpareDrugID }}</td>
                  <td v-if="subject.subjectRandomisationStatus === 'unmasked'">{{ subject.subjectGroup }}</td>
                  <td v-else></td>
                  <td>{{ subject.subjectInitials }}</td>
                  <td>
                    <i class="fas fa-male text-primary" v-if="subject.subjectGender === 'male'"></i>
                    <i class="fas fa-female text-danger" v-else></i>
                  </td>
                  <td>{{ subject.subjectEnterDate.substr(0, 10) }}</td>
                  <td>
                    <div class="progress">
                      <div class="progress-bar progress-bar-striped progress-bar-animated"
                           :style="`width: ${
                             Math.floor(parseInt(subject.subjectMedicationCurrent)/parseInt(subject.subjectMedicationMax) * 100)
                           }%`">
                        {{ subject.subjectMedicationCurrent }}/{{ subject.subjectMedicationMax }}
                      </div>
                    </div>
                  </td>
                  <td>{{ processRandomisationStatus(subject.subjectRandomisationStatus) }}</td>
                  <td>{{ processResponse(subject.subjectResponse) }}</td>
                  <td class="text-right">
                    <span class="cursor-pointer" @click="includeSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'screen'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.includeSubjectModalTitle')">
                       <i class="far fa-check-circle text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="excludeSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'screen'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.excludeSubjectModalTitle')">
                      <i class="far fa-times-circle text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="getDrugID(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'include'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.getDrugIDModalTitle')">
                      <i class="fas fa-capsules text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="getSpareDrugID(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'allocated'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.getSpareDrugIDModalTitle')">
                      <i class="fas fa-truck text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="unmaskSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'allocated' || subject.subjectRandomisationStatus === 'spare'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.unmaskSubjectModalTitle')">
                      <i class="far fa-eye text-danger"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="editSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'allocated' || subject.subjectRandomisationStatus === 'spare' ||  subject.subjectRandomisationStatus === 'unmasked'"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.editSubjectModalTitle')">
                      <i class="far fa-edit text-primary"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="showHistory(subject.subjectScreeningID)"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.showHistoryModalTitle')">
                      <i class="fas fa-info-circle text-primary"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="deleteSubject(subject.subjectScreeningID)"
                          data-toggle="tooltip" data-placement="top" :title="$t('subjects.deleteSubjectModalTitle')">
                      <i class="far fa-trash-alt text-danger"></i>&nbsp;
                    </span>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row my-5">
          <div class="col-12 m-auto text-center">
            <div class="btn-group btn-group-lg">
              <button class="btn btn-hero" @click="createSubject">
                {{ $t('subjects.create') }}
              </button>
              <button class="btn btn-secondary" @click="navigate('homepage')">
                {{ $t('subjects.home') }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <modal :modalID="modalID" :modalTitle="modalTitle" :modalType="modalType"
           :modalConfirmButtonClass="modalConfirmButtonClass" @modalConfirmation="processModalConfirmation"
           :customParameters="customParameters">
      <template v-slot:modalBody v-if="['include', 'exclude', 'getDrugID', 'getSpareDrugID', 'unmaskSubject', 'delete'].includes(modalType)">
        <span>
          {{ modalMessage }}
        </span>
      </template>
      <template v-slot:modalBody v-else-if="['create'].includes(modalType)">
        <div class="container">
          <div class="row">
            <div class="col-12 form-group">
              <label for="subjectInitials">
                {{ $t('subjects.subjectInitials') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.subjectInitialsInstruction')"></i>
              </label>
              <input type="text" class="form-control form-control-lg" v-model="subjectInitials" :placeholder="$t('subjects.subjectInitials')"
                     id="subjectInitials" required>
            </div>
            <div class="col-12 form-group">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectGender1" value="male" v-model="subjectGender">
                <label class="form-check-label" for="subjectGender1">
                  {{ $t('subjects.subjectGender1') }}&nbsp;
                  <i class="fas fa-male text-primary"></i>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectGender2" value="female" v-model="subjectGender">
                <label class="form-check-label" for="subjectGender2">
                  {{ $t('subjects.subjectGender2') }}&nbsp;
                  <i class="fas fa-female text-danger"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:modalBody v-else-if="['edit'].includes(modalType)">
        <div class="container">
          <div class="row">
            <div class="col-12 form-group">
              <label for="subjectMedicationCurrent">
                {{ $t('subjects.subjectMedicationCurrent') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.subjectMedicationCurrentInstruction')"></i>
              </label>
              <input type="text" class="form-control form-control-lg" v-model="subjectMedicationCurrent" :placeholder="$t('subjects.subjectMedicationCurrent')"
                     id="subjectMedicationCurrent" required>
            </div>
            <div class="col-12 form-group">
              <label for="subjectMedicationMaxE">
                {{ $t('subjects.subjectMedicationMax') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.subjectMedicationMaxInstruction')"></i>
              </label>
              <input type="text" class="form-control form-control-lg" v-model="subjectMedicationMax" :placeholder="$t('subjects.subjectMedicationMax')"
                     id="subjectMedicationMaxE" required>
            </div>
            <div class="col-12 form-group">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectResponse0" value="no" v-model="subjectResponse">
                <label class="form-check-label" for="subjectResponse0">
                  {{ $t('subjects.subjectResponse0') }}
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectResponse1" value="yes" v-model="subjectResponse">
                <label class="form-check-label" for="subjectResponse1">
                  {{ $t('subjects.subjectResponse1') }}
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectResponse2" value="unknown" v-model="subjectResponse">
                <label class="form-check-label" for="subjectResponse2">
                  {{ $t('subjects.subjectResponse2') }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:modalBody v-else-if="['history'].includes(modalType)">
        <div class="container">
          <div class="row">
            <div class="col-12 form-group">
              <label for="notesForUnmask">
                {{ $t('subjects.notesForUnmask') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.notesForUnmaskInstruction')"></i>
              </label>
              <textarea class="form-control" id="notesForUnmask" rows="5"
                        :placeholder="$t('subjects.notesForUnmask')" v-model="notesForUnmask"></textarea>
            </div>
            <div class="col-12 form-group">
              <label for="notesForSpareDrug">
                {{ $t('subjects.notesForSpareDrug') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.notesForSpareDrugInstruction')"></i>
              </label>
              <textarea class="form-control" id="notesForSpareDrug" rows="5"
                        :placeholder="$t('subjects.notesForSpareDrug')" v-model="notesForSpareDrug"></textarea>
            </div>
            <div class="col-12 form-group">
              <label for="otherNotes">
                {{ $t('subjects.otherNotes') }}&nbsp;
                <i class="fas fa-question-circle cursor-pointer" data-toggle="tooltip" data-placement="top" :title="$t('subjects.otherNotesInstruction')"></i>
              </label>
              <textarea class="form-control" id="otherNotes" rows="5"
                        :placeholder="$t('subjects.otherNotes')" v-model="otherNotes"></textarea>
            </div>
          </div>
        </div>
      </template>
    </modal>

    <modal modalID="responseModal" :modalTitle="modalTitle" modalType="response"
           :modalConfirmButtonClass="modalConfirmButtonClass" @modalConfirmation="processModalConfirmation"
           :customParameters="customParameters">
      <template v-slot:modalBody>
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
      schemeUUID: null,
      subjectList: [],
      randomisationStatusMap: new Map()
          .set('screen', ['Under Screening', '等待筛检'])
          .set('include', ['to be Allocated', '等待分组'])
          .set('exclude', ['Excluded', '被排除'])
          .set('allocated', ['Allocated', '已分组'])
          .set('unmasked', ['Unmasked', '已紧急揭盲'])
          .set('spare', ['Spare Drug Used', '已使用备用药物']),
      responseMap: new Map()
          .set('unknown', ['Unknown', '暂时未知'])
          .set('yes', ['Yes', '响应'])
          .set('no', ['No', '无响应']),
      subjectInitials: null,
      subjectGender: null,
      subjectMedicationMax: null,
      subjectMedicationCurrent: null,
      subjectResponse: null,
      notesForUnmask: null,
      notesForSpareDrug: null,
      otherNotes: null,
      modalID: null,
      modalTitle: null,
      modalType: null,
      modalConfirmButtonClass: null,
      customParameters: null,
      modalMessage: null,
    }),
    mounted: function () {
      if (localStorage.getItem('schemeUUID')) {
        this.schemeUUID = JSON.parse(localStorage.getItem('schemeUUID'));
      } else {
        this.schemeUUID = this.$route.params.schemeUUID;
        localStorage.setItem('schemeUUID', JSON.stringify(this.$route.params.schemeUUID));
      }
      this.$axios.get('/api/subject/all', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        params: {
          // 'offset': '0',
          // 'limit': '10',
          schemeSchemeUUID: this.schemeUUID,
        },
      }).then((response) => {
        this.subjectList = response.data.subjectsAndInfo.rows;
      }).catch((error) =>  {
        console.log(error);
      });
    },
    beforeDestroy () {
      localStorage.removeItem('schemeUUID');
    },
    methods: {
      processRandomisationStatus: function (statusString) {
        if (this.$i18n.locale === 'en') {
          return this.randomisationStatusMap.get(statusString)[0];
        } else {
          return this.randomisationStatusMap.get(statusString)[1];
        }
      },
      processResponse: function (statusString) {
        if (this.$i18n.locale === 'en') {
          return this.responseMap.get(statusString)[0];
        } else {
          return this.responseMap.get(statusString)[1];
        }
      },
      navigate: function (routerName, params) {
        this.$router.push({
          name: routerName,
          params: params,
        });
      },
      createSubject: function () {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'createSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.createSubjectModalTitle');
          this.modalType = 'create';
          this.modalConfirmButtonClass = 'btn-hero';
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#createSubjectModal').modal('show');
        });
      },
      includeSubject: function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'includeSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.includeSubjectModalTitle');
          this.modalType = 'include';
          this.modalConfirmButtonClass = 'btn-success';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.includeSubjectModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#includeSubjectModal').modal('show');
        });
      },
      excludeSubject:  function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'excludeSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.excludeSubjectModalTitle');
          this.modalType = 'exclude';
          this.modalConfirmButtonClass = 'btn-warning';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.excludeSubjectModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#excludeSubjectModal').modal('show');
        });
      },
      getDrugID:  function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'getDrugIDModal';
          this.modalTitle = this.$i18n.t('subjects.getDrugIDModalTitle');
          this.modalType = 'getDrugID';
          this.modalConfirmButtonClass = 'btn-success';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.getDrugIDModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#getDrugIDModal').modal('show');
        });
      },
      getSpareDrugID:  function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'getSpareDrugIDModal';
          this.modalTitle = this.$i18n.t('subjects.getSpareDrugIDModalTitle');
          this.modalType = 'getSpareDrugID';
          this.modalConfirmButtonClass = 'btn-warning';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.getSpareDrugIDModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#getSpareDrugIDModal').modal('show');
        });
      },
      unmaskSubject:  function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'unmaskSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.unmaskSubjectModalTitle');
          this.modalType = 'unmaskSubject';
          this.modalConfirmButtonClass = 'btn-danger';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.unmaskSubjectModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#unmaskSubjectModal').modal('show');
        });
      },
      editSubject:  function (subjectScreeningID) {
        this.$axios.get('/api/subject', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          params: {
            subjectScreeningID: subjectScreeningID,
          },
        }).then((response) => {
          this.subjectMedicationCurrent = response.data.getOneSubjectResponse.subjectMedicationCurrent;
          this.subjectMedicationMax = response.data.getOneSubjectResponse.subjectMedicationMax;
          this.subjectResponse = response.data.getOneSubjectResponse.subjectResponse;
        }).catch((error) =>  {
          console.log(error);
        });
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'editSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.editSubjectModalTitle');
          this.modalType = 'edit';
          this.modalConfirmButtonClass = 'btn-primary';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#editSubjectModal').modal('show');
        });
      },
      showHistory: function (subjectScreeningID) {
        this.$axios.get('/api/subject', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          params: {
            subjectScreeningID: subjectScreeningID,
          },
        }).then((response) => {
          this.notesForUnmask = response.data.getOneSubjectResponse.notesForUnmask;
          this.notesForSpareDrug = response.data.getOneSubjectResponse.notesForSpareDrug;
          this.otherNotes = response.data.getOneSubjectResponse.otherNotes;
        }).catch((error) =>  {
          console.log(error);
        });
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'showHistoryModal';
          this.modalTitle = this.$i18n.t('subjects.showHistoryModalTitle');
          this.modalType = 'history';
          this.modalConfirmButtonClass = 'btn-primary';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#showHistoryModal').modal('show');
        });
      },
      deleteSubject:  function (subjectScreeningID) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'deleteSubjectModal';
          this.modalTitle = this.$i18n.t('subjects.deleteSubjectModalTitle');
          this.modalType = 'delete';
          this.modalConfirmButtonClass = 'btn-danger';
          this.customParameters = {
            subjectScreeningID: subjectScreeningID
          };
          this.modalMessage = this.$i18n.t(
              'subjects.deleteSubjectModalMessage',
              { subjectScreeningID: subjectScreeningID }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#deleteSubjectModal').modal('show');
        });
      },
      processModalConfirmation: function (modelType, customParameters) {
        switch (modelType) {
          case 'create':
            this.$axios.post('/api/subject', {
              subjectInitials: this.subjectInitials,
              subjectGender: this.subjectGender,
              schemeSchemeUUID: this.schemeUUID,
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'include':
            this.$axios.patch('/api/subject', {
              schemeSchemeUUID: this.schemeUUID,
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'include',
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'exclude':
            this.$axios.patch('/api/subject', {
              schemeSchemeUUID: this.schemeUUID,
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'exclude',
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'getDrugID':
            this.$axios.patch('/api/subject', {
              schemeSchemeUUID: this.schemeUUID,
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'allocated',
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'getSpareDrugID':
            this.$axios.patch('/api/subject', {
              schemeSchemeUUID: this.schemeUUID,
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'spare',
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'unmaskSubject':
            this.$axios.patch('/api/subject', {
              schemeSchemeUUID: this.schemeUUID,
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'unmasked',
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'edit':
            this.$axios.patch('/api/subject', {
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'edit',
              subjectMedicationMax: this.subjectMedicationMax,
              subjectMedicationCurrent: this.subjectMedicationCurrent,
              subjectResponse: this.subjectResponse,
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'history':
            this.$axios.patch('/api/subject', {
              subjectScreeningID: customParameters.subjectScreeningID,
              subjectRandomisationStatus: 'history',
              notesForUnmask: this.notesForUnmask,
              notesForSpareDrug: this.notesForSpareDrug,
              otherNotes: this.otherNotes,
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'delete':
            this.$axios.delete('/api/subject', {
              params: {
                subjectScreeningID: customParameters.subjectScreeningID
              }
            }).then((response) => {
              this.callResponseModal(response);
            }).catch((error) => {
              console.error(error);
            });
            break;
          case 'response':
            setTimeout(() => {
              location.reload();
            }, 1000 )
            break;
        }
      },
      callResponseModal: function (response) {
        if (response.data.statusCode === '0') {
          this.modalTitle = this.$i18n.t('modal.errorResponseModalTitle');
          this.modalMessage = this.$i18n.t(
              'modal.errorResponseModalMessage',
              {
                errorReason: response.data.error.errorCode + ' ' + response.data.error.message
              }
          );
          this.modalConfirmButtonClass = 'btn-danger';
          $('#responseModal').modal('show');
        } else {
          this.modalTitle = this.$i18n.t('modal.successResponseModalTitle');
          this.modalMessage = this.$i18n.t('modal.successResponseModalMessage');
          this.modalConfirmButtonClass = 'btn-success';
          $('#responseModal').modal('show');
        }
      },
    },
  }
</script>

<style scoped>
  .max-height {
    height: 100vh;
  }
  #subjects {
    background: url("https://images.unsplash.com/photo-1576765607924-3f7b8410a787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2554&q=80");
    background-size: cover;
    position: relative;
  }
  .subjects-overlay {
    background: white;
    opacity: .90;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-pointer:hover {
    color: #635CDB;
    text-decoration: none;
  }
  .table {
    white-space: nowrap;
  }
  .custom-height {
    max-height: 65vh;
  }
  .container-fluid-supporter {
    max-width: 95vw;
  }
</style>