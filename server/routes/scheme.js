const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getAllSchemes, getOneScheme } = require('../controllers/SchemeController');

// base: /scheme

// GET /scheme/all get all schemes
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
      const schemes = await getAllSchemes(
          parseInt(req.query.offset),
          parseInt(req.query.limit),
      );
      return {
        statusCode: "1",
        schemes: schemes,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when get all schemes: ${error}`,
        errorCode: '0_GETALL_SCHEMES',
      },
    };
  } finally {
    res.json(result);
  }
});

// GET /scheme get one scheme
router.get('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const scheme = await getOneScheme({
        schemeUUID: req.query.schemeUUID,
      });
      return {
        statusCode: "1",
        scheme: scheme,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when get one scheme: ${error}`,
        errorCode: '0_GETONE_SCHEME',
      },
    };
  } finally {
    res.json(result);
  }
});

module.exports = router;