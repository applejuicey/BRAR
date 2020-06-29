<template>
  <div>

    <section id="schemes" class="py-5 max-height row align-items-center">
      <div class="overlay schemes-overlay"></div>
      <div class="container">

        <div class="row">
          <div class="col-12">
            <h3 class="mt-5 mb-4 text-center">{{ $t('schemes.title') }}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12 table-responsive">
            <table class="table table-striped table-hover text-center">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">{{ $t('schemes.schemeName') }}</th>
                <th scope="col">{{ $t('schemes.schemeProgress') }}</th>
                <th scope="col">{{ $t('schemes.actions') }}</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(scheme, key) in schemes">
                <tr>
                  <th scope="row">{{ key + 1 }}</th>
                  <td>{{ scheme.schemeName }}</td>
                  <td>
                    <div class="progress">
                      <div class="progress-bar progress-bar-striped progress-bar-animated"
                           :style="`width: ${
                             Math.floor(parseInt(scheme.subjects.length)/parseInt(scheme.maximumSampleSize) * 100)
                           }%`"></div>
                    </div>
                  </td>
                  <td>
                    <span class="cursor-pointer" @click="navigate('subjects', {
                      schemeUUID: scheme.schemeUUID
                    })" data-toggle="tooltip" data-placement="top" :title="$t('schemes.subjectList')">
                       <i class="fas fa-list text-success"></i>&nbsp;
                    </span>
<!--                    <span class="cursor-pointer">-->
<!--                      <i class="far fa-edit text-primary"></i>&nbsp;-->
<!--                    </span>-->
                    <span class="cursor-pointer" @click="deleteScheme(scheme.schemeUUID, scheme.schemeName)"
                          data-toggle="tooltip" data-placement="top" :title="$t('schemes.delete')">
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
              <button class="btn btn-hero"
                      @click="navigate('custom', {
                defaultScheme: {
                    decisionStrategy: 'decisionStrategy1',
                    constructionMethod: 'constructionMethod2'
                }
                })">
                {{ $t('schemes.create') }}
              </button>
              <button class="btn btn-secondary" @click="navigate('homepage')">
                {{ $t('schemes.home') }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <modal :modalID="modalID" :modalTitle="modalTitle" :modalType="modalType"
           :modalConfirmButtonClass="modalConfirmButtonClass" @modalConfirmation="processModalConfirmation"
           :customParameters="customParameters">
      <template v-slot:modalBody v-if="['delete'].includes(modalType)">
        <span>
          {{ modalMessage }}
        </span>
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
      schemes: [],
      modalID: null,
      modalTitle: null,
      modalType: null,
      modalConfirmButtonClass: null,
      customParameters: null,
      modalMessage: null,
    }),
    mounted: function () {
      this.$axios.get('/api/scheme/all', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        params: {
          // 'offset': '0',
          // 'limit': '5',
        },
      }).then((response) => {
        this.schemes = response.data.schemesAndInfo.rows;
      }).catch((error) =>  {
        console.log(error);
      });
    },
    methods: {
      navigate: function (routerName, params) {
        this.$router.push({
          name: routerName,
          params: params,
        });
      },
      deleteScheme:  function (schemeUUID, schemeName) {
        let initiateModalPromise = new Promise((resolve, reject) => {
          this.modalID = 'deleteSchemeModal';
          this.modalTitle = this.$i18n.t('schemes.deleteSchemeModalTitle');
          this.modalType = 'delete';
          this.modalConfirmButtonClass = 'btn-danger';
          this.customParameters = {
            schemeUUID: schemeUUID
          };
          this.modalMessage = this.$i18n.t(
              'schemes.deleteSchemeModalMessage',
              { schemeName: schemeName }
          );
          resolve();
        });
        initiateModalPromise.then(() => {
          $('#deleteSchemeModal').modal('show');
        });
      },
      processModalConfirmation: function (modelType, customParameters) {
        switch (modelType) {
          case 'delete':
            this.$axios.delete('/api/scheme', {
              params: {
                schemeUUID: customParameters.schemeUUID
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
  #schemes {
    background: url("https://images.unsplash.com/photo-1576670158645-ef7b03134e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    position: relative;
  }
  .schemes-overlay {
    background: white;
    opacity: .85;
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