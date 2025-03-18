const express = require("express");
const router = express.Router();

const {Gquestion, oneQuestion, Pquestion} = require("../Controller/questionController");



// fetch all route
router.get('/', Gquestion)

// question_id route
router.get("/:question_id", oneQuestion);

// question create route
router.post('/', Pquestion)

module.exports = router;