<template>
  <div>

    <div class="banner-area banner-1 test row align-items-center">
      <div class="overlay gr-overlay"></div>
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 m-auto text-center col-sm-12 col-md-12">
                <div class="banner-content content-padding">
                  <h5 class="subtitle">Bayesian Response-adaptive Randomisation</h5>
                  <h1 class="banner-title">贝叶斯适应性随机化</h1>
                  <p>方案模拟评价及实际试验中实施</p>
                  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                    Tooltip on top
                  </button>
                  <!-- <a href="#" class="btn btn-white btn-circled">lets start</a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="intro" class="section-padding test row align-items-center">
      <div class="container">

        <div class="row">
          <div class="col-lg-12 col-sm-12 col-md-12">
            <div class="section-heading">
              <p class="lead">请在这里选择一种贝叶斯适应性随机化方法</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-sm-6 col-md-6">
            <div class="service-box">
              <div class="service-img-icon">
                <img src="images/icon/007-digital-marketing-3.png" alt="service-icon" class="img-fluid">
              </div>
              <div class="service-inner">
                <h4>二分类结局的两臂试验</h4>
                <p>一些方法学介绍</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 col-md-6">
            <div class="service-box ">
              <div class="service-img-icon">
                <img src="images/icon/008-digital-marketing-2.png" alt="service-icon" class="img-fluid">
              </div>
              <div class="service-inner">
                <h4>二分类结局的三臂试验</h4>
                <p>固定参照</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 col-md-6">
            <div class="service-box">
              <div class="service-img-icon">
                <img src="images/icon/003-task.png" alt="service-icon" class="img-fluid">
              </div>
              <div class="service-inner">
                <h4>
                  <router-link :to="{ name: 'type1' }">二分类结局的三臂试验</router-link>
                </h4>
                <p>移动参照</p>
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

        }),
        components: {},
        created: function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        },
        methods: {

        },
    }
</script>

<style scoped>
  .test {
    height: 100vh;
  }
</style>