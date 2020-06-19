const sequelize = require('../database/sequelize');
const { SCHEME1DATA, SCHEME2DATA } = require('../database/private');
// 引入Models
const Scheme = require('./Scheme');
const Subject = require('./Subject');

// ASSOCIATIONS：sequelize规定函数被调用的模型为source，被作为函数参数传递的模型为target

// 主表为Scheme表，从表为Subject表；向Subject表中添加schemeSchemeUUID列
// Scheme实例对象将拥有get\set\createSubject方法
Scheme.Subject = Scheme.hasMany(Subject, {as: 'subjects'});

// 首次运行需要创建数据表并初始化
// const needInitialization = true;
const needInitialization = false;
if (needInitialization) {
  sequelize.sync({
    force: true
  }).then(async () => {
    console.log('Tables created, starting initiation procedures ......');
    const scheme1 = await Scheme.create(SCHEME1DATA.schemeTableData);
    await scheme1.createSubject(SCHEME1DATA.subjectTableData_1);
    await scheme1.createSubject(SCHEME1DATA.subjectTableData_2);
    await scheme1.createSubject(SCHEME1DATA.subjectTableData_3);
    const scheme2 = await Scheme.create(SCHEME2DATA.schemeTableData);
    await scheme2.createSubject(SCHEME2DATA.subjectTableData_1);
    await scheme2.createSubject(SCHEME2DATA.subjectTableData_2);
    await scheme2.createSubject(SCHEME2DATA.subjectTableData_3);
    // console.log(authority1.get({ plain: true }));
    console.log('initiation procedures success');
  }).catch((error) => {
    console.log('initiation procedures failed, reason: ', error);
  });
}

module.exports = { Scheme, Subject };