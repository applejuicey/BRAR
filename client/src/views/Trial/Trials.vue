<template>
  <div>

    <section id="trials" class="py-5 max-height row align-items-center">
      <div class="overlay trials-overlay"></div>
      <div class="container">

        <div class="row">
          <div class="col-12">
            <h3 class="mt-5 mb-4 text-center">{{ $t('trials.title') }}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">{{ $t('trials.trialName') }}</th>
                <th scope="col">{{ $t('trials.trialProgress') }}</th>
                <th scope="col">{{ $t('trials.actions') }}</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(trial, key) in trialList">
                <tr>
                  <th scope="row">{{ key + 1 }}</th>
                  <td>{{ trial.trialName }}</td>
                  <td>
                    <div class="progress">
                      <div class="progress-bar progress-bar-striped progress-bar-animated"
                           :style="`width: ${
                             Math.floor(parseInt(trial.trialSampleSizeCurrent)/parseInt(trial.trialSampleSizeMax) * 100)
                           }%`"></div>
                    </div>
                  </td>
                  <td>
                    <span class="cursor-pointer" @click="navigate('subjects', {
                      trialID: trial.trialID
                    })">
                       <i class="fas fa-list text-success"></i>&nbsp;
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
              <button class="btn btn-hero" @click="createTrial" data-toggle="tooltip" data-placement="top" :title="$t('trials.createTrial')">
                {{ $t('trials.create') }}
              </button>
              <button class="btn btn-secondary" @click="navigate('homepage')" data-toggle="tooltip" data-placement="top" :title="$t('trials.homeInstruction')">
                {{ $t('trials.home') }}
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
      trialList: [],
    }),
    mounted: function () {
      this.trialList = [
        {
          trialID: '1',
          trialName: 'Fluoxetine Hydrochloride on Out-Patients with Depressive Disorder',
          trialSampleSizeMax: '90',
          trialSampleSizeCurrent: '28',
        },
        {
          trialID: '2',
          trialName: 'Example Clinical Trial 1',
          trialSampleSizeMax: '100',
          trialSampleSizeCurrent: '18',
        },
        {
          trialID: '3',
          trialName: 'Example Clinical Trial 2',
          trialSampleSizeMax: '1200',
          trialSampleSizeCurrent: '562',
        },
        {
          trialID: '4',
          trialName: 'Example Clinical Trial 3',
          trialSampleSizeMax: '90',
          trialSampleSizeCurrent: '90',
        },
      ];
    },
    methods: {
      createTrial: function () {

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
  #trials {
    background: url("https://images.unsplash.com/photo-1576670158645-ef7b03134e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    position: relative;
  }
  .trials-overlay {
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
</style>