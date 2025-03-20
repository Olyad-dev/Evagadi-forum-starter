function Gquestion(req, res) {
    res.send("Successful fetches all questions");
}

function oneQuestion(req, res) {
res.send("Retrieves details of a specific question")}

function Pquestion(req, res) {
    res.send("Question created successfully");
}

module.exports = { Gquestion, oneQuestion, Pquestion };
