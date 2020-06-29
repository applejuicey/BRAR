<template>
  <div>

    <nav class="navbar navbar-expand-lg fixed-top trans-navigation" id="navbar">
      <div class="container">
        <a class="navbar-brand" href="#banner">{{ $t('homepage.navLogo') }}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav">
          <span class="navbar-toggler-icon">
            <i class="fa fa-bars"></i>
          </span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="mainNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#introduction">{{ $t('homepage.navLink1') }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#schemes">{{ $t('homepage.navLink2') }}</a>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'schemes' }" class="nav-link">
                {{ $t('homepage.navLink3') }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="banner" class="banner-area max-height row align-items-center">
      <div class="overlay gr-overlay"></div>
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-md-12 m-auto text-center">
                <div class="banner-content content-padding">
                  <p class="cursor-pointer" @click="toggleLanguage">
                    <i class="fas fa-language"></i>&nbsp;
                    {{ $t('homepage.titleInverse') }}
                  </p>
                  <h1 class="banner-title">{{ $t('homepage.title') }}</h1>
                  <p>{{ $t('homepage.subtitle') }}</p>
                  <a href="#schemes" class="btn btn-white btn-circled">{{ $t('homepage.start') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="introduction" class="section-padding max-height row align-items-center">
      <div class="overlay introduction-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="mb-5">
              <h3 class="mb-4">{{ $t('homepage.introductionTitle') }}</h3>
              <p class="lead text-dark font-weight-lighter">
                <mark>{{ $t('homepage.title') }}</mark>
                {{ $t('homepage.introductionText') }}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="text-dark text-left"><i class="fas fa-quote-left"></i></p>
            <blockquote class="blockquote text-left text-monospace">
              <p class="mb-0 text-dark font-weight-light">{{ $t('homepage.introductionQuoteText') }}</p>
            </blockquote>
            <p class="text-dark text-right"><i class="fas fa-quote-right"></i></p>
            <blockquote class="blockquote text-right text-monospace">
              <footer class="blockquote-footer text-dark">{{ $t('homepage.introductionQuoteFooter') }}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="schemes" class="section-padding max-height row align-items-center">
      <div class="overlay schemes-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="mt-5 mb-4 text-center">{{ $t('homepage.schemesTitle') }}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="service-box">
              <div class="service-inner">
                <h4 class="cursor-pointer" @click="navigate('custom', {
                defaultScheme: {
                    decisionStrategy: 'decisionStrategy1',
                    constructionMethod: 'constructionMethod2',
                }
                })">
                  <i class="far fa-hand-pointer"></i>
                  &nbsp;{{ $t('homepage.method1Title') }}
                </h4>
                <ul class="text-left homepage-ul text-dark font-weight-light">
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method1BriefIntro1') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method1BriefIntro2') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method1BriefIntro3') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="service-box ">
              <div class="service-inner">
                <h4 class="cursor-pointer" @click="navigate('custom', {
                defaultScheme: {
                    decisionStrategy: 'decisionStrategy1',
                    constructionMethod: 'constructionMethod1',
                }
                })">
                  <i class="far fa-hand-pointer"></i>
                  &nbsp;{{ $t('homepage.method2Title') }}
                </h4>
                <ul class="text-left homepage-ul text-dark font-weight-light">
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method2BriefIntro1') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method2BriefIntro2') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method2BriefIntro3') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="service-box">
              <div class="service-inner">
                <h4 class="cursor-pointer" @click="navigate('custom', {
                defaultScheme: {
                    decisionStrategy: 'decisionStrategy1',
                    constructionMethod: 'constructionMethod4',
                }
                })">
                  <i class="far fa-hand-pointer"></i>
                  &nbsp;{{ $t('homepage.method3Title') }}
                </h4>
                <ul class="text-left homepage-ul text-dark font-weight-light">
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method3BriefIntro1') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method3BriefIntro2') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method3BriefIntro3') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-12 col-md-6">
            <div class="service-box">
              <div class="service-inner">
                <h4 class="cursor-pointer" @click="navigate('custom', {
                defaultScheme: {
                    decisionStrategy: 'decisionStrategy1',
                    constructionMethod: 'constructionMethod2',
                }
                })">
                  <i class="far fa-hand-pointer"></i>
                  &nbsp;{{ $t('homepage.method4Title') }}
                </h4>
                <div class="text-left text-dark font-weight-light">{{ $t('homepage.method4BriefIntro1') }}</div>
                <ul class="text-left homepage-ul text-dark font-weight-light">
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method4BriefIntro2') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method4BriefIntro3') }}</li>
                  <li><i class="fas fa-caret-right"></i>&nbsp;{{ $t('homepage.method4BriefIntro4') }}</li>
                </ul>
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
    mounted: function () {
      window.addEventListener('scroll', this.changeNavbarBGColor);
    },
    beforeDestroy: function () {
      window.removeEventListener('scroll', this.changeNavbarBGColor);
    },
    methods: {
      toggleLanguage: function () {
        if (this.$i18n.locale === 'en') {
          this.$i18n.locale = 'zh';
        } else {
          this.$i18n.locale = 'en';
        }
      },
      changeNavbarBGColor: function () {
        let navbar = document.getElementById("navbar");
        let navbarHeight = navbar.offsetHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > navbarHeight) {
          navbar.classList.add("bg-dark");
        } else {
          navbar.classList.remove("bg-dark");
        }
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
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-pointer:hover {
    color: #635CDB;
    text-decoration: none;
  }
  #banner {
    background: url("https://images.unsplash.com/photo-1520278013317-50b1dfd757cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    position: relative;
  }
  #introduction {
    background: url("https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    position: relative;
  }
  .introduction-overlay {
    /*background: linear-gradient(#53a0fd 30%, #51eca5 100%);*/
    background: #f8f9fa;
    opacity: .90;
  }
  #schemes {
    background: url("https://images.unsplash.com/photo-1551419762-4a3d998f6292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60");
    background-size: cover;
    position: relative;
  }
  .schemes-overlay {
    background: white;
    opacity: .95;
  }
</style>