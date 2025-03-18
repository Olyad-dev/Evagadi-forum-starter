const express = require("express");
const router = express.Router();

const {oneAnswer, Panswer} = require("../Controller/answerController")


// answer_id route
router.get("/:question_id",oneAnswer);

// answer create route
router.post('/', Panswer)

module.exports = router;