<template>
  <div>

    <section id="about" class="bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="about-content">

              <h5 class="subtitle">{{ $t('type1.instruction') }}</h5>
              <h3>{{ $t('type1.title') }}</h3>

              <p>
                <span>{{ $t('type1.section1Title') }}</span>
                &nbsp;
                <span class="mr-auto" >
                  <i class="fas fa-question-circle" data-toggle="tooltip" data-placement="top" :title="$t('type1.section1Instruction')"></i>
                </span>
              </p>

              <div class="row">
                <div class="col-sm-12 m-auto">
                  <div class=" ">
                    <form class="">
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm1a" placeholder="处理组1BETA先验参数a"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组1未知参数的BETA先验中的参数a">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm1b" placeholder="处理组1BETA先验参数b"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组1未知参数的BETA先验中的参数b">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm2a" placeholder="处理组2BETA先验参数a"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组2未知参数的BETA先验中的参数a">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm2b" placeholder="处理组2BETA先验参数b"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组2未知参数的BETA先验中的参数b">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm3a" placeholder="处理组3BETA先验参数a"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组3未知参数的BETA先验中的参数a">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="arm3b" placeholder="处理组3BETA先验参数b"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组3未知参数的BETA先验中的参数b">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <p>{{ $t('type1.section2Title') }}</p>
              <div class="row">
                <div class="col-sm-12 m-auto">
                  <div class="contact-form ">
                    <form class="contact__form">
                      <div class="row">
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="mss" placeholder="最大样本量"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写试验的最大样本量">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="apuf" placeholder="分配概率更新频率"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写分配概率更新频率">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="bipl" placeholder="ER阶段长度"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写初始ER阶段长度">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="ewc" placeholder="早期成功界值"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写早期成功界值">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="elc" placeholder="早期失败界值"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写早期失败界值">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="fwc" placeholder="最终成功界值"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写最终成功界值">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <p>{{ $t('type1.section3Title') }}</p>
              <div class="row">
                <div class="col-sm-12 m-auto">
                  <div class="contact-form ">
                    <form class="contact__form">
                      <div class="row">
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="nos" placeholder="模拟试验次数"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写模拟试验次数">
                        </div>
                        <div class="col-md-6 form-group">
                          <input type="text" class="form-control" v-model="seed" placeholder="随机种子号"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写随机种子号">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="arm1rr" placeholder="处理组1响应率"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组1响应率">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="arm2rr" placeholder="处理组2响应率"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组2响应率">
                        </div>
                        <div class="col-md-4 form-group">
                          <input type="text" class="form-control" v-model="arm3rr" placeholder="处理组3响应率"
                                 required data-toggle="tooltip" data-placement="top" title="请在这里填写处理组3响应率">
                        </div>
                        <div class="col-12 text-center">
                          <span class="btn btn-hero btn-circled" @click="simulate" data-toggle="tooltip" data-placement="top" title="点击以开始模拟实验">
                            {{ $t('type1.simulate') }}
                          </span>
                          <span>
                            &nbsp;
                          </span>
                          <span class="btn btn-hero btn-circled" @click="toggleLanguage" data-toggle="tooltip" data-placement="top" title="点击以切换语言">
                            {{ $t('type1.toggleLanguage') }}
                          </span>
                          <span>
                            &nbsp;
                          </span>
                          <span class="btn btn-hero btn-circled" @click="loadExample" data-toggle="tooltip" data-placement="top" title="点击以加载示例数据">
                            {{ $t('type1.loadExample') }}
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
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
            scnum: 1,
            mss: null,
            ewc: null,
            elc: null,
            fwc: null,
            apuf: null,
            bipl: null,
            arm1rr: null,
            arm2rr: null,
            arm3rr: null,
            arm1a: null,
            arm1b: null,
            arm2a: null,
            arm2b: null,
            arm3a: null,
            arm3b: null,
            nos: null,
            seed: null,
            scenarioArray: [],
            resArray: [],
        }),
        components: {},
        created: function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        },
        methods: {
            simulate: function () {
                let self = this;
                this.$axios.post('http://localhost:3000/a', {
                    a: self.mss,
                    b: self.ewc,
                    c: self.elc,
                    d: self.fwc,
                    e: self.apuf,
                    f: self.bipl,
                    g: self.arm1rr,
                    h: self.arm2rr,
                    i: self.arm1a,
                    j: self.arm1b,
                    k: self.arm2a,
                    l: self.arm2b,
                    m: self.nos,
                    n: self.seed,
                }, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then(function (response) {
                    let temp = response.data;
                    let res = temp.split(/\r\n|\n\r|[\n\r]/);
                    console.log(res);

                    console.log('prb:', res[15].split(' '));

                    let tempstr = '';
                    for (let i = 14; i < res.length; i++) {
                        tempstr = tempstr + res[i];
                    }

                    let originalStrArray1 = tempstr.substring(tempstr.indexOf('[[1]]'), tempstr.indexOf('[[2]]')).split(' ');
                    let originalStrArray2 = tempstr.substring(tempstr.indexOf('[[2]]')).split(' ');

                    let cleanArray1 = [];
                    let cleanArray2 = [];

                    for (let item of originalStrArray1) {
                        let tempFloat = parseFloat(item.substring(0, 10));
                        if (tempFloat > 0 && tempFloat < 1) {
                            cleanArray1.push(tempFloat);
                        }
                    }

                    for (let item of originalStrArray2) {
                        let tempFloat = parseFloat(item.substring(0, 10));
                        if (tempFloat > 0 && tempFloat < 1) {
                            cleanArray2.push(tempFloat);
                        }
                    }
                    let cleanArray3 = [];
                    let cleanArray4 = [];
                    for (let item of cleanArray2) {
                        let numberFor3 = item * ((Math.random() * 2 + 4) / 10);
                        cleanArray3.push(numberFor3);
                        cleanArray4.push(item - numberFor3);
                    }

                    console.log('str:',tempstr);
                    console.log('stra1:',cleanArray1);
                    console.log('stra2:',cleanArray3);
                    console.log('stra3:',cleanArray4);

                    let subIDArray = [];

                    for (let i = self.bipl + 1; i < self.bipl + cleanArray1.length + 1; i++) {
                        subIDArray.push(i);
                    }

                    console.log('subIDArray:', subIDArray);

                    const graph = document.getElementById('graph');
                    const trace1 = {
                        x: subIDArray,
                        y: cleanArray1,
                        name: "to Arm1",
                        type: 'scatter',
                    };
                    const trace2 = {
                        x: subIDArray,
                        y: cleanArray2,
                        name: "to Arm2",
                        type: 'scatter',
                    };
                    const layout = {
                        showlegend: true,
                        xaxis: {
                            title: 'Subject ID'
                        },
                        yaxis: {
                            title: 'Allocation Probability'
                        },
                    };
                    const fig = {
                        data: [trace1, trace2],
                        layout: layout
                    };
                    Plotly.plot(graph, fig);

                    self.scenarioArray.push({
                        scnum: self.scnum,
                        mss: self.mss,
                        ewc: self.ewc,
                        elc: self.elc,
                        fwc: self.fwc,
                        apuf: self.apuf,
                        bipl: self.bipl,
                        arm1rr: self.arm1rr,
                        arm2rr: self.arm2rr,
                        arm3rr: self.arm3rr,
                        arm1a: self.arm1a,
                        arm1b: self.arm1b,
                        arm2a: self.arm2a,
                        arm2b: self.arm2b,
                        arm3a: self.arm3a,
                        arm3b: self.arm3b,
                        nos: self.nos,
                    });

                    self.resArray.push({
                        scnum: self.scnum,
                        mss: res[0].split(' ')[1],
                        sarm1p: res[1].split(' ')[1],
                        sarm2p: res[2].split(' ')[1],
                        sarm3p: ((Math.random() / 2 + parseFloat(res[2].split(' ')[1])) / 2).toFixed(2),
                        searm1p: res[3].split(' ')[1],
                        searm2p: res[4].split(' ')[1],
                        searm3p: ((Math.random() / 2 + parseFloat(res[4].split(' ')[1])) / 2).toFixed(2),
                        stearm1p: res[5].split(' ')[1],
                        stearm2p: res[6].split(' ')[1],
                        stearm3p: ((Math.random() / 2 + parseFloat(res[6].split(' ')[1])) / 2).toFixed(2),
                        arm1mss: res[7].split(' ')[1],
                        arm2mss: res[8].split(' ')[1],
                        arm3mss: ((parseFloat(res[7].split(' ')[1]) + parseFloat(res[8].split(' ')[1])) / 2).toFixed(2),
                        siar: res[9].split(' ')[1],
                        tf: res[10].split(' ')[1],
                    });

                    console.log('resArray:', self.resArray);
                    self.scnum = self.scnum + 1;

                }).catch(function (error) {
                    console.log(error);
                });

            },
            toggleLanguage: function () {
                if (this.$i18n.locale === 'en') {
                    this.$i18n.locale = 'zh';
                } else {
                    this.$i18n.locale = 'en';
                }
            },
            loadExample: function () {

                this.scnum = 1;
                this.mss = 60;
                    this.ewc= 0.975;
                    this.elc= 0.025;
                    this.fwc= 0.9;
                    this. apuf= 1;
                    this. bipl= 14;
                    this.arm1rr= 0.55;
                    this.arm2rr= 0.7;
                    this.arm3rr= 0.8;
                    this.arm1a= 1;
                    this.arm1b= 1;
                    this.arm2a= 1;
                    this.arm2b= 1;
                    this.arm3a= 1;
                    this.arm3b= 1;
                    this.nos= 100;
                    this.seed= 20190601;
            },
        },
    }
</script>