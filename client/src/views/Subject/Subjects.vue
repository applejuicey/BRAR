<template>
  <div>

    <section id="subjects" class="py-5 max-height row align-items-center">
      <div class="overlay subjects-overlay"></div>
      <div class="container">

        <div class="row">
          <div class="col-12">
            <h3 class="mt-5 mb-4 text-center">{{ $t('subjects.title') }}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12 table-responsive">
            <table class="table table-striped table-hover text-center">
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
                  <td>{{ subject.subjectGroup }}</td>
                  <td>{{ subject.subjectInitials }}</td>
                  <td>
                    <i class="fas fa-male text-primary" v-if="subject.subjectGender === 'male'"></i>
                    <i class="fas fa-female text-danger" v-else></i>
                  </td>
                  <td>{{ subject.subjectEnterDate }}</td>
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
                          v-if="subject.subjectRandomisationStatus === 'screen'">
                       <i class="far fa-check-circle text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="excludeSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'screen'">
                      <i class="far fa-times-circle text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="getDrugID(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'include'">
                      <i class="fas fa-capsules text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="getSpareDrugID(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'allocated'">
                      <i class="fas fa-truck text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="unmaskSubject(subject.subjectScreeningID)"
                          v-if="subject.subjectRandomisationStatus === 'allocated' || subject.subjectRandomisationStatus === 'spare'">
                      <i class="far fa-eye text-danger"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="editSubject(subject.subjectScreeningID)">
                      <i class="far fa-edit text-primary"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click="deleteSubject(subject.subjectScreeningID)">
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
              <button class="btn btn-hero" @click="createSubject" data-toggle="tooltip"
                      data-placement="top" :title="$t('subjects.createSubject')">
                {{ $t('subjects.create') }}
              </button>
              <button class="btn btn-secondary" @click="navigate('homepage')"
                      data-toggle="tooltip" data-placement="top" :title="$t('subjects.homeInstruction')">
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
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectResponse0" value="0" v-model="subjectResponse">
                <label class="form-check-label" for="subjectResponse0">
                  {{ $t('subjects.subjectResponse0') }}
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="subjectResponse1" value="1" v-model="subjectResponse">
                <label class="form-check-label" for="subjectResponse1">
                  {{ $t('subjects.subjectResponse1') }}
                </label>
              </div>
            </div>
          </div>
        </div>
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
      subjectList: [],
      randomisationStatusMap: new Map()
          .set('screen', 'Under Screening')
          .set('include', 'to be Allocated')
          .set('exclude', 'Excluded')
          .set('allocated', 'Allocated')
          .set('unmasked', 'Unmasked')
          .set('spare', 'Spare Drug Used'),
      responseMap: new Map()
          .set('1', 'Yes')
          .set('0', 'No'),
      subjectInitials: null,
      subjectGender: null,
      subjectResponse: null,
      modalID: null,
      modalTitle: null,
      modalType: null,
      modalConfirmButtonClass: null,
      customParameters: null,
      modalMessage: null,
    }),
    mounted: function () {
      this.subjectList = [
        {
          subjectID: "",
          subjectScreeningID: "1",
          subjectDrugID: "",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "FHX",
          subjectGender: "male",
          subjectEnterDate: "2020-10-10",
          subjectMedicationCurrent: '0',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "screen",
          subjectResponse: "",
        },
        {
          subjectID: "",
          subjectScreeningID: "2",
          subjectDrugID: "",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "JFDC",
          subjectGender: "male",
          subjectEnterDate: "2020-1-11",
          subjectMedicationCurrent: '0',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "include",
          subjectResponse: "",
        },
        {
          subjectID: "",
          subjectScreeningID: "3",
          subjectDrugID: "",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "DFG",
          subjectGender: "female",
          subjectEnterDate: "2020-10-11",
          subjectMedicationCurrent: '0',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "exclude",
          subjectResponse: "",
        },
        {
          subjectID: "1",
          subjectScreeningID: "4",
          subjectDrugID: "1",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "HXK",
          subjectGender: "female",
          subjectEnterDate: "2020-10-15",
          subjectMedicationCurrent: '1',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "allocated",
          subjectResponse: "",
        },
        {
          subjectID: "2",
          subjectScreeningID: "5",
          subjectDrugID: "2",
          subjectSpareDrugID: "",
          subjectGroup: "arm1",
          subjectInitials: "VIO",
          subjectGender: "male",
          subjectEnterDate: "2020-10-12",
          subjectMedicationCurrent: '4',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "unmasked",
          subjectResponse: "",
        },
        {
          subjectID: "3",
          subjectScreeningID: "6",
          subjectDrugID: "3",
          subjectSpareDrugID: "A3",
          subjectGroup: "",
          subjectInitials: "JCS",
          subjectGender: "male",
          subjectEnterDate: "2020-10-9",
          subjectMedicationCurrent: '2',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "spare",
          subjectResponse: "",
        },
        {
          subjectID: "4",
          subjectScreeningID: "7",
          subjectDrugID: "4",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "CSZ",
          subjectGender: "female",
          subjectEnterDate: "2020-10-5",
          subjectMedicationCurrent: '5',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "allocated",
          subjectResponse: "1",
        },
        {
          subjectID: "5",
          subjectScreeningID: "8",
          subjectDrugID: "5",
          subjectSpareDrugID: "",
          subjectGroup: "",
          subjectInitials: "PSZ",
          subjectGender: "male",
          subjectEnterDate: "2020-10-15",
          subjectMedicationCurrent: '5',
          subjectMedicationMax: '5',
          subjectRandomisationStatus: "allocated",
          subjectResponse: "0",
        },
      ];
    },
    methods: {
      processRandomisationStatus: function (statusString) {
        return this.randomisationStatusMap.get(statusString);
      },
      processResponse: function (statusString) {
        return this.responseMap.get(statusString);
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
        // 先获取信息，并向subjectResponse赋值
        this.subjectResponse = this.subjectList[parseInt(subjectScreeningID)-1].subjectResponse;
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
          // let modal = document.getElementById("editSubjectModal");
          // modal.setAttribute('data-backdrop', 'static');
          // modal.setAttribute('data-keyboard', 'false');
          $('#editSubjectModal').modal('show');
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
            console.log(
                'create',
                this.subjectInitials,
                this.subjectGender,
            );
            break;
          case 'include':
            console.log('include', customParameters.subjectScreeningID);
            break;
          case 'exclude':
            console.log('exclude', customParameters.subjectScreeningID);
            break;
          case 'getDrugID':
            console.log('getDrugID', customParameters.subjectScreeningID);
            break;
          case 'getSpareDrugID':
            console.log('getSpareDrugID', customParameters.subjectScreeningID);
            break;
          case 'unmaskSubject':
            console.log('unmaskSubject', customParameters.subjectScreeningID);
            break;
          case 'edit':
            console.log(
                'edit',
                this.subjectResponse,
                customParameters.subjectScreeningID,
            );
            break;
          case 'delete':
            console.log('delete', customParameters.subjectScreeningID);
            break;
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
</style>