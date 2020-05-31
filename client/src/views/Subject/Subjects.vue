<template>
  <div>

    <section id="subjects" class="py-5 max-height row align-items-center">
      <div class="overlay subjects-overlay"></div>
      <div class="container" style="width: 80vw">

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
                    <span class="cursor-pointer" @click=""
                          v-if="subject.subjectRandomisationStatus === 'screen'">
                       <i class="far fa-check-circle text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click=""
                          v-if="subject.subjectRandomisationStatus === 'screen'">
                      <i class="far fa-times-circle text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click=""
                          v-if="subject.subjectRandomisationStatus === 'include'">
                      <i class="fas fa-capsules text-success"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click=""
                          v-if="subject.subjectRandomisationStatus === 'allocated'">
                      <i class="fas fa-truck text-warning"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer" @click=""
                          v-if="subject.subjectRandomisationStatus === 'allocated' || subject.subjectRandomisationStatus === 'spare'">
                      <i class="far fa-eye text-danger"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer">
                      <i class="far fa-edit text-primary"></i>&nbsp;
                    </span>
                    <span class="cursor-pointer">
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

  </div>
</template>

<script>
  export default {
    data: () => ({
      subjectList: [],
      randomisationStatusMap: new Map()
          .set('screen', 'Under Screening')
          .set('include', 'to be Allocated')
          .set('exclude', 'Excluded')
          .set('allocated', 'Allocated')
          .set('unmasked', 'Unmasked')
          .set('spare', 'Spare Medicine Used'),
      responseMap: new Map()
          .set('1', 'Yes')
          .set('0', 'No'),
    }),
    mounted: function () {
      this.subjectList = [
        {
          subjectID: "",
          subjectScreeningID: "1",
          subjectDrugID: "",
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
      createSubject: function () {

      },
      navigate: function (routerName, params) {
        this.$router.push({
          name: routerName,
          params: params,
        });
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
</style>