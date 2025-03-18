const express = require("express");
require("dotenv").config()
const app = express();

const dbConnection = require("./db/dbConfig")

app.use(express.json())

const authMiddleware = require("./Middleware/AuthMiddleware");

// user routes middleware file
const userRoutes = require("./Routes/usersRoute");

// user routes middleware 
app.use("/api/users", authMiddleware, userRoutes);



// question routes middleware file
const questionRoutes = require("./Routes/questionsRoute");

// user routes middleware 
app.use("/api/question", authMiddleware, questionRoutes);



//answer routes middleware file
const answerRoutes = require("./Routes/answersRoute");

// answer routes middleware 
app.use("/api/answer", authMiddleware, answerRoutes);


async function start() {
  try {
    const [result] = await dbConnection.execute("select 'test' ");
    // console.log(result)
    app.listen(5001);
    console.log(`database connection established`);
    console.log('listening on 5001 port')
  } catch (error) {
    console.log(error.message)
  }
}
start();

