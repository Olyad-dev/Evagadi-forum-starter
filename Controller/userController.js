const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const {username, firstname, lastname, email, password} = req.body
  if (!email || !password || !firstname || !lastname || !username ) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide all required information" });
  }

  try {

    const [user] = await dbConnection.query("SELECT username,userid FROM users where username = ? or email = ?", [username, email]);
    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg: "user already registered"})
    }

    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashPassword]);
      return res.status(StatusCodes.CREATED).json({ msg: "User registered successfully"});

  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong, try again later!"})
  }
}

async function login(req, res) {
 const { email, password } = req.body;
 if (!email || !password) {
   return res
     .status(StatusCodes.BAD_REQUEST)
     .json({ msg: "please enter all required information" });
 }

try {
  
  const [user] = await dbConnection.query(
    "SELECT username,userid, password FROM users WHERE email = ?",
    [email]
  );

  if (user.length == 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid credential"})
  }

  const isMatch = await bcrypt.compare(password, user[0].password)
  if (!isMatch) {
     return res
       .status(StatusCodes.BAD_REQUEST)
       .json({ msg: "Invalid credential" })}

       const username = user[0].username;
       const userid = user[0].userid;
       const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
         expiresIn: "30d",
       });

   return res.status(StatusCodes.OK).json({msg: "user login successful", token})

  
} catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
}


}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid});
}

module.exports = { register, login, checkUser };
