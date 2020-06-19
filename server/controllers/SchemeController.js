const { Scheme, Subject } = require('../models/index');
const { getType } = require('../utils/index');

const getIncludeArray = function () {
  return [
    {
      model: Subject,
      as: 'subjects',
    },
  ];
};

// 查找所有Scheme，根据offset和limit返回用户数据（包括子表的字段）
const getAllSchemes = async function(offset, limit) {
  return Scheme.findAndCountAll({
    distinct: true,
    offset: getType(offset) === 'Number' ? Math.round(offset) : 0,
    limit: getType(limit) === 'Number' ? Math.round(limit) : 10,
    // include: getIncludeArray(),
    attributes: ['schemeUUID', 'schemeName', 'maximumSampleSize']
  });
};

// 查找一个Scheme
const getOneScheme = async function(where) {
  return Scheme.findOne({
    where: getType(where) === 'Object'? where : {},
    // include: getIncludeArray(),
  });
};

// 创建一个Scheme
const createScheme = async function(newScheme) {
  return Scheme.create(
      getType(newScheme) === 'Object' ? newScheme : {},
      {
        fields: Scheme.writableFieldsKeyNamesArray
      }
  );
};

// 修改一个Scheme
// const updateScheme = async function(where, newScheme) {
//   return Scheme.update(
//       getType(newScheme) === 'Object'? newScheme : {},
//       {
//         where: where,
//         fields: Scheme.writableFieldsKeyNamesArray,
//       }
//   );
// };

// 删除一个Scheme
const deleteScheme = async function(where) {
  return Scheme.destroy({
    where: where,
  });
};

module.exports = { getAllSchemes, getOneScheme, createScheme, deleteScheme };