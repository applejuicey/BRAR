const { Subject, Scheme } = require('../models/index');
const { getType, format } = require('../utils/index');
const { Op } = require("sequelize");
const child_process = require('child_process');
const exec = child_process.exec;
const path = require('path');
const r_file_path = path.join(__dirname, '../analysis/analyst.R');

// get all subjects and related information according to 'offset', 'limit' and 'schemeSchemeUUID'
const getAllSubjectsAndInfo = async function(offset, limit, schemeSchemeUUID) {
  return Subject.findAndCountAll({
    distinct: true,
    // offset: getType(offset) === 'Number' ? Math.round(offset) : 0,
    // limit: getType(limit) === 'Number' ? Math.round(limit) : 10,
    where: {
      schemeSchemeUUID: schemeSchemeUUID,
    },
    // attributes: {
    //   exclude: ['subjectGroup']
    // }
  });
};

// create one subject
const createSubject = async function(newSubject) {
  return Subject.create(
      getType(newSubject) === 'Object' ? newSubject : {},
  );
};

// delete one subject
const deleteSubject = async function(where) {
  return Subject.destroy({
    where: where,
  });
};

// patch one subject
const patchSubject = async function(where, newSubjectInformation) {
  switch (newSubjectInformation.subjectRandomisationStatus) {
    case "include":
      const maxSubjectIDRecord = await Subject.findAll({
        where: {
          schemeSchemeUUID: where.schemeSchemeUUID,
        },
        order: [['subjectID', 'DESC']],
        limit: 1,
      });
      if (maxSubjectIDRecord[0].subjectID === null) {
        return Subject.update(
            {
              subjectRandomisationStatus: 'include',
              subjectID: 1,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      } else {
        return Subject.update(
            {
              subjectRandomisationStatus: 'include',
              subjectID: maxSubjectIDRecord[0].subjectID + 1,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      }
      break;
    case "exclude":
      return Subject.update(
          {
            subjectRandomisationStatus: 'exclude',
          },
          {
            where: {
              subjectScreeningID: where.subjectScreeningID,
            },
          });
      break;
    case "allocated":
      const currentSchemeRecord = await Scheme.findOne({
        where: {
          schemeUUID: where.schemeSchemeUUID,
        },
      });
      const currentSubjectNumberRecords = await Subject.findAndCountAll({
        where: {
          schemeSchemeUUID: where.schemeSchemeUUID,
          subjectDrugID: {
            [Op.ne]: null
          }
        },
      });
      const currentSubjectNumber = currentSubjectNumberRecords.count + 1;
      const betaPriorParameterA = JSON.parse(currentSchemeRecord.betaPriorParameterA);
      const betaPriorParameterB = JSON.parse(currentSchemeRecord.betaPriorParameterB);
      let numberOfSuccesses = [];
      let numberOfFailures = [];
      for (let armIndex = 0; armIndex < currentSchemeRecord.armNumber; armIndex++) {
        const numberOfSuccessesRecords = await Subject.findAndCountAll({
          where: {
            schemeSchemeUUID: where.schemeSchemeUUID,
            subjectResponse: 'yes',
            subjectGroup: armIndex + 1 + '',
          },
        });
        const numberOfFailuresRecords =  await Subject.findAndCountAll({
          where: {
            schemeSchemeUUID: where.schemeSchemeUUID,
            subjectResponse: 'no',
            subjectGroup: armIndex + 1 + '',
          },
        });
        numberOfSuccesses.push(numberOfSuccessesRecords.count);
        numberOfFailures.push(numberOfFailuresRecords.count);
      }
      let scriptParameterString = currentSchemeRecord.decisionStrategy + ' ' +
          currentSchemeRecord.earlyDropThreshold + ' ' +
          currentSchemeRecord.earlyWinnerThreshold + ' ' +
          currentSchemeRecord.clinicalSignificanceThreshold + ' ' +
          currentSchemeRecord.clinicalSignificanceValue + ' ' +
          currentSchemeRecord.constructionMethod + ' ' +
          currentSchemeRecord.adjustmentMethod1 + ' ' +
          currentSchemeRecord.adjustmentMethod2 + ' ' +
          currentSchemeRecord.adjustmentMethod3 + ' ' +
          currentSchemeRecord.burnInBlockNumber + ' ' +
          currentSchemeRecord.burnInBlockLength + ' ' +
          currentSchemeRecord.tuningParameterType + ' ' +
          currentSchemeRecord.tuningParameterValue + ' ' +
          currentSchemeRecord.clipMethodMinimumThreshold + ' ' +
          currentSchemeRecord.armNumber + ' ' +
          currentSchemeRecord.maximumSampleSize + ' ' +
          currentSchemeRecord.adaptiveBlockNumber + ' ' +
          currentSchemeRecord.adaptiveBlockLength + ' ' +
          currentSubjectNumber + ' ' +
          format(betaPriorParameterA) +
          format(betaPriorParameterB) +
          format(numberOfSuccesses) +
          format(numberOfFailures);
      let commandLineScript = 'Rscript' + ' ' + r_file_path + ' ' + scriptParameterString;
      const allocatedGroupNumber = await new Promise((resolve, reject) => {
        exec(commandLineScript, (error, stdout, stderr) => {
          if (error) {
            console.error(error);
          }
          resolve(stdout? parseInt(stdout.substr(4)) : stderr);
        });
      });
      const maxSubjectDrugIDRecord = await Subject.findAll({
        where: {
          schemeSchemeUUID: where.schemeSchemeUUID,
        },
        order: [['subjectDrugID', 'DESC']],
        limit: 1,
      });
      if (maxSubjectDrugIDRecord[0].subjectDrugID === null) {
        return Subject.update(
            {
              subjectRandomisationStatus: 'allocated',
              subjectDrugID: 1,
              subjectGroup: allocatedGroupNumber,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      } else {
        return Subject.update(
            {
              subjectRandomisationStatus: 'allocated',
              subjectDrugID: maxSubjectDrugIDRecord[0].subjectDrugID + 1,
              subjectGroup: allocatedGroupNumber,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      }
      break;
    case "spare":
      const maxSubjectSpareDrugIDRecord = await Subject.findAll({
        where: {
          schemeSchemeUUID: where.schemeSchemeUUID,
        },
        order: [['subjectSpareDrugID', 'DESC']],
        limit: 1,
      });
      if (maxSubjectSpareDrugIDRecord[0].subjectSpareDrugID === null) {
        return Subject.update(
            {
              subjectRandomisationStatus: 'spare',
              subjectSpareDrugID: 1,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      } else {
        return Subject.update(
            {
              subjectRandomisationStatus: 'spare',
              subjectSpareDrugID: maxSubjectSpareDrugIDRecord[0].subjectSpareDrugID + 1,
            },
            {
              where: {
                subjectScreeningID: where.subjectScreeningID,
              },
            });
      }
      break;
    case "unmasked":
      return Subject.update(
          {
            subjectRandomisationStatus: 'unmasked',
          },
          {
            where: {
              subjectScreeningID: where.subjectScreeningID,
            },
          });
      break;
    case "edit":
      return Subject.update(
          {
            subjectMedicationMax: newSubjectInformation.subjectMedicationMax,
            subjectMedicationCurrent: newSubjectInformation.subjectMedicationCurrent,
            subjectResponse: newSubjectInformation.subjectResponse,
          },
          {
            where: {
              subjectScreeningID: where.subjectScreeningID,
            },
          });
      break;
    case "history":
      return Subject.update(
          {
            notesForUnmask: newSubjectInformation.notesForUnmask,
            notesForSpareDrug: newSubjectInformation.notesForSpareDrug,
            otherNotes: newSubjectInformation.otherNotes,
          },
          {
            where: {
              subjectScreeningID: where.subjectScreeningID,
            },
          });
      break;
  }
};

// get one subject
const getOneSubject = async function(where) {
  return Subject.findOne({
    where: where,
    attributes: [
      'subjectMedicationMax',
      'subjectMedicationCurrent',
      'subjectResponse',
      'notesForUnmask',
      'notesForSpareDrug',
      'otherNotes',
    ],
  });
};

module.exports = { getAllSubjectsAndInfo, createSubject, deleteSubject, patchSubject, getOneSubject };