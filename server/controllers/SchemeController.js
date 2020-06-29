const { Scheme, Subject } = require('../models/index');
const { getType } = require('../utils/index');
const { Op } = require("sequelize");

// get all schemes and related information according to 'offset' and 'limit'
const getAllSchemesAndInfo = async function(offset, limit) {
  return Scheme.findAndCountAll({
    distinct: true,
    // offset: getType(offset) === 'Number' ? Math.round(offset) : 0,
    // limit: getType(limit) === 'Number' ? Math.round(limit) : 10,
    include: {
      model: Subject,
      as: 'subjects',
      attributes: ['subjectRandomisationStatus'],
      where: {
        subjectRandomisationStatus: {
          [Op.or]: ['allocated', 'unmasked', 'spare']
        }
      },
      required: false,
    },
    attributes: ['schemeUUID', 'schemeName', 'maximumSampleSize']
  });
};

// 查找一个Scheme
// const getOneScheme = async function(where) {
//   return Scheme.findOne({
//     where: getType(where) === 'Object'? where : {},
//     // include: getIncludeArray(),
//   });
// };

// 创建一个Scheme
const createScheme = async function(newScheme) {
  return Scheme.create(
      getType(newScheme) === 'Object' ? newScheme : {},
  );
};

// 删除一个Scheme
const deleteScheme = async function(where) {
  return Scheme.destroy({
    where: where,
  });
};

module.exports = { getAllSchemesAndInfo, createScheme, deleteScheme };