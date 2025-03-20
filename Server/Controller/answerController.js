function oneAnswer(req, res) {
  res.send("Retrieves answers for a specific question");
}

function Panswer(req, res) {
    res.send("Answer posted successfully");
}

module.exports = { oneAnswer, Panswer };
