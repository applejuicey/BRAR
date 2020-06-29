const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../database/sequelize');

class Scheme extends Model {}

Scheme.init({
  schemeUUID: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  schemeName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a unique scheme name should be specified'
      },
    },
  },
  decisionStrategy: {
    type: Sequelize.ENUM,
    values: [
      'decisionStrategy1',
      'decisionStrategy2'
    ],
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a decision strategy should be specified'
      },
    },
  },
  earlyDropThreshold: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an early drop threshold should be specified'
      },
    },
  },
  earlyWinnerThreshold: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an early winner threshold should be specified'
      },
    },
  },
  clinicalSignificanceThreshold: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a clinical significance threshold should be specified'
      },
    },
  },
  clinicalSignificanceValue: {
    type: Sequelize.FLOAT,
  },
  constructionMethod: {
    type: Sequelize.ENUM,
    values: [
      'constructionMethod1',
      'constructionMethod2',
      'constructionMethod3',
      'constructionMethod4',
      'constructionMethod5',
      'constructionMethod6',
    ],
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a construction method of allocation probabilities should be specified'
      },
    },
  },
  adjustmentMethod1: {
    type: Sequelize.BOOLEAN,
  },
  adjustmentMethod2: {
    type: Sequelize.BOOLEAN,
  },
  adjustmentMethod3: {
    type: Sequelize.BOOLEAN,
  },
  burnInBlockNumber: {
    type: Sequelize.INTEGER,
    validate: {
      conditionalNotNull: function (value) {
        if(this.adjustmentMethod1) {
          if (!value) {
            throw new Error('a burn-in block number should be specified when adjustment method 1 is used')
          }
        }
      }
    },
  },
  burnInBlockLength: {
    type: Sequelize.INTEGER,
    validate: {
      conditionalNotNull: function (value) {
        if(this.adjustmentMethod1) {
          if (!value) {
            throw new Error('a burn-in block length should be specified when adjustment method 1 is used')
          }
        }
      }
    },
  },
  tuningParameterType: {
    type: Sequelize.ENUM,
    values: [
      'fixed',
      'adapted',
    ],
    validate: {
      conditionalNotNull: function (value) {
        if(this.adjustmentMethod2) {
          if (!value) {
            throw new Error('a tuning parameter type should be specified when adjustment method 2 is used')
          }
        }
      }
    },
  },
  tuningParameterValue: {
    type: Sequelize.FLOAT,
    validate: {
      conditionalNotNull: function (value) {
        if(this.adjustmentMethod2 && this.tuningParameterType === 'fixed') {
          if (!value) {
            throw new Error('a tuning parameter value should be specified when adjustment method1 is used and the tuning parameter type is set as "fixed"')
          }
        }
      }
    },
  },
  clipMethodMinimumThreshold: {
    type: Sequelize.FLOAT,
    validate: {
      conditionalNotNull: function (value) {
        if(this.adjustmentMethod3) {
          if (!value) {
            throw new Error('a clip method minimum threshold should be specified when adjustment method 3 is used')
          }
        }
      }
    },
  },
  armNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an arm number should be specified'
      },
    },
  },
  maximumSampleSize: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an maximum sample size should be specified'
      },
    },
  },
  adaptiveBlockNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an adaptive block number should be specified'
      },
    },
  },
  adaptiveBlockLength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'an adaptive block length should be specified'
      },
    },
  },
  betaPriorParameterA: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a beta prior parameter A should be specified'
      },
    },
  },
  betaPriorParameterB: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'a beta prior parameter B should be specified'
      },
    },
  },
}, {
  sequelize,
  modelName: 'scheme',
  tableName: 'scheme',
  freezeTableName: true,
  timestamps: true,
});

module.exports = Scheme;