import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactsqllogin",
});

app.post("/register", (req, res) => {
  // query using parameterized values
  const sql =
    "INSERT INTO users (`name`,`email`,`password`,`companyname`) VALUES (?,?,?,?)";
  // hashing the password
  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "Error in password hashing" });
    // insert to db is hasing is suscessfull
    const vals = [req.body.name, req.body.email, hash, req.body.companyName];
    db.query(sql, vals, (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Status: "Sucess" });
    });
  });
});
app.post("/login", () => {
  console.log(req.body);
});
app.listen(3565, () => {
  console.log("Server Listening at port 3565");
});
