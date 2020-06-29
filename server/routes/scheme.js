const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getAllSchemesAndInfo, createScheme, deleteScheme } = require('../controllers/SchemeController');

// base: /scheme

// GET /scheme/all get all schemes and related information
// req.query.offset number of records jumped
// req.query.limit number of records needed
router.get('/all', async function (req, res) {
  let record = JSON.stringify({
    ipAddress: req.ip,
    time: new Date(),
  }) + '\n';
  fs.appendFile('../accessRecord.txt', record, 'utf-8', (error) => {
    if (error) {
      console.error(error);
      return false;
    }
  });
  let result = {};
  try {
    result = await (async function () {
      const schemesAndInfo = await getAllSchemesAndInfo(
          parseInt(req.query.offset),
          parseInt(req.query.limit),
      );
      return {
        statusCode: "1",
        schemesAndInfo: schemesAndInfo,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when get all schemes and related info: ${error}`,
        errorCode: '0_GETALL_SCHEMES',
      },
    };
  } finally {
    res.json(result);
  }
});

// POST /scheme create one scheme
router.post('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const createSchemeResponse = await createScheme(
          {
            schemeName: req.body.schemeName,
            decisionStrategy: req.body.decisionStrategy,
            earlyDropThreshold: req.body.earlyDropThreshold,
            earlyWinnerThreshold: req.body.earlyWinnerThreshold,
            clinicalSignificanceThreshold: req.body.clinicalSignificanceThreshold,
            clinicalSignificanceValue: req.body.clinicalSignificanceValue,
            constructionMethod: req.body.constructionMethod,
            adjustmentMethod1: req.body.adjustmentMethod1,
            adjustmentMethod2: req.body.adjustmentMethod2,
            adjustmentMethod3: req.body.adjustmentMethod3,
            burnInBlockNumber: req.body.burnInBlockNumber,
            burnInBlockLength: req.body.burnInBlockLength,
            tuningParameterType: req.body.tuningParameterType,
            tuningParameterValue: req.body.tuningParameterValue,
            clipMethodMinimumThreshold: req.body.clipMethodMinimumThreshold,
            armNumber: req.body.armNumber,
            maximumSampleSize: req.body.maximumSampleSize,
            adaptiveBlockNumber: req.body.adaptiveBlockNumber,
            adaptiveBlockLength: req.body.adaptiveBlockLength,
            betaPriorParameterA: JSON.stringify(req.body.betaPriorParameterA),
            betaPriorParameterB: JSON.stringify(req.body.betaPriorParameterB),
          }
      );
      return {
        statusCode: "1",
        createSchemeResponse: createSchemeResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when create one scheme: ${error}`,
        errorCode: '0_CREATEONE_SCHEME',
      },
    };
  } finally {
    res.json(result);
  }
});

// DELETE /scheme delete one scheme
router.delete('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const deleteSchemeResponse = await deleteScheme(
          {
            schemeUUID: req.query.schemeUUID,
          }
      );
      return {
        statusCode: "1",
        deleteSchemeResponse: deleteSchemeResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when delete one scheme: ${error}`,
        errorCode: '0_DELETEONE_SCHEME',
      },
    };
  } finally {
    res.json(result);
  }
});

module.exports = router;