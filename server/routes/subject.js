const express = require('express');
const router = express.Router();
const { getAllSubjectsAndInfo, createSubject, deleteSubject, patchSubject, getOneSubject } = require('../controllers/SubjectController');

// base: /subject

// GET /subject/all get all subjects and related information
// req.query.offset number of records jumped
// req.query.limit number of records needed
router.get('/all', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const subjectsAndInfo = await getAllSubjectsAndInfo(
          parseInt(req.query.offset),
          parseInt(req.query.limit),
          req.query.schemeSchemeUUID,
      );
      return {
        statusCode: "1",
        subjectsAndInfo: subjectsAndInfo,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when get all subjects and related info: ${error}`,
        errorCode: '0_GETALL_SUBJECTS',
      },
    };
  } finally {
    res.json(result);
  }
});

// POST /subject create one subject
router.post('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const createSubjectResponse = await createSubject(
          {
            subjectInitials: req.body.subjectInitials,
            subjectGender: req.body.subjectGender,
            subjectMedicationMax: req.body.subjectMedicationMax,
            schemeSchemeUUID: req.body.schemeSchemeUUID,
          }
      );
      return {
        statusCode: "1",
        createSubjectResponse: createSubjectResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when create one subject: ${error}`,
        errorCode: '0_CREATEONE_SUBJECT',
      },
    };
  } finally {
    res.json(result);
  }
});

// DELETE /subject delete one subject
router.delete('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const deleteSubjectResponse = await deleteSubject(
          {
            subjectScreeningID: req.query.subjectScreeningID,
          }
      );
      return {
        statusCode: "1",
        deleteSubjectResponse: deleteSubjectResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when delete one subject: ${error}`,
        errorCode: '0_DELETEONE_SUBJECT',
      },
    };
  } finally {
    res.json(result);
  }
});

// PATCH /subject patch one subject
router.patch('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const patchSubjectResponse = await patchSubject(
          {
            schemeSchemeUUID: req.body.schemeSchemeUUID,
            subjectScreeningID: req.body.subjectScreeningID,
          },
          {
            subjectRandomisationStatus: req.body.subjectRandomisationStatus,
            subjectMedicationMax: req.body.subjectMedicationMax,
            subjectMedicationCurrent: req.body.subjectMedicationCurrent,
            subjectResponse: req.body.subjectResponse,
            notesForUnmask: req.body.notesForUnmask,
            notesForSpareDrug: req.body.notesForSpareDrug,
            otherNotes: req.body.otherNotes,
          }
      );
      return {
        statusCode: "1",
        patchSubjectResponse: patchSubjectResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when patch one subject: ${error}`,
        errorCode: '0_PATCHONE_SUBJECT',
      },
    };
  } finally {
    res.json(result);
  }
});

// GET /subject get one subject
router.get('/', async function (req, res) {
  let result = {};
  try {
    result = await (async function () {
      const getOneSubjectResponse = await getOneSubject(
          {
            subjectScreeningID: req.query.subjectScreeningID,
          }
      );
      return {
        statusCode: "1",
        getOneSubjectResponse: getOneSubjectResponse,
      };
    }) ();
  } catch (error) {
    console.error(error);
    result = {
      statusCode: "0",
      error: {
        message: `unknown error when get one subject: ${error}`,
        errorCode: '0_GETONE_SUBJECT',
      },
    };
  } finally {
    res.json(result);
  }
});

module.exports = router;