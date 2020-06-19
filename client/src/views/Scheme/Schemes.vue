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
            <table class="table table-striped table-hover">
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
                             Math.floor(parseInt(scheme.trialSampleSizeCurrent)/parseInt(scheme.maximumSampleSize) * 100)
                           }%`"></div>
                    </div>
                  </td>
                  <td>
                    <span class="cursor-pointer" @click="navigate('subjects', {
                      schemeUUID: scheme.schemeUUID
                    })">
                       <i class="fas fa-list text-success"></i>&nbsp;
                    </span>
<!--                    <span class="cursor-pointer">-->
<!--                      <i class="far fa-edit text-primary"></i>&nbsp;-->
<!--                    </span>-->
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
              <button class="btn btn-hero" @click="navigate('custom')" data-toggle="tooltip" data-placement="top" :title="$t('schemes.createScheme')">
                {{ $t('schemes.create') }}
              </button>
              <button class="btn btn-secondary" @click="navigate('homepage')" data-toggle="tooltip" data-placement="top" :title="$t('schemes.homeInstruction')">
                {{ $t('schemes.home') }}
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
      schemes: [],
    }),
    mounted: function () {
      this.$axios.get('/api/scheme/all', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        params: {
          'offset': '0',
          'limit': '5',
        },
      }).then((response) => {
        console.log(response.data.schemes.rows);
        this.schemes = response.data.schemes.rows;
        // TODO 再去服务器拉取每个方案当前入组人数
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