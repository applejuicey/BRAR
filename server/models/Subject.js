const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../database/sequelize');

class Subject extends Model {}

Subject.init({
  subjectScreeningID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subjectDrugID: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  subjectSpareDrugID: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  subjectGroup: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  subjectInitials: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a subject initial should be specified'
      },
    },
  },
  subjectGender: {
    type: Sequelize.ENUM,
    values: [
      'male',
      'female',
    ],
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a subject gender should be specified'
      },
    },
  },
  subjectEnterDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  subjectMedicationCurrent: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  subjectMedicationMax: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  subjectRandomisationStatus: {
    type: Sequelize.ENUM,
    values: [
      'screen',
      'include',
      'exclude',
      'allocated',
      'unmasked',
      'spare',
    ],
    defaultValue: 'screen',
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a subject randomisation status should be specified'
      },
    },
  },
  subjectResponse: {
    type: Sequelize.ENUM,
    values: [
      'yes',
      'no',
      'unknown',
    ],
    defaultValue: 'unknown',
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a subject response should be specified'
      },
    },
  },
}, {
  sequelize,
  modelName: 'subject',
  tableName: 'subject',
  freezeTableName: true,
  timestamps: true,
});

module.exports = Subject;