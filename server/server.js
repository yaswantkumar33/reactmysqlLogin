import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactsqllogin",
});

const verifyauth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Verify Failed In Server Side" });
  } else {
    jwt.verify(token, "bqusp-yash-psuqb", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Error In Token Decode" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyauth, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO users (`name`,`email`,`password`,`companyname`) VALUES (?,?,?,?)";
  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "Error in password hashing" });
    const vals = [req.body.name, req.body.email, hash, req.body.companyName];
    db.query(sql, vals, (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email=?";
  const vals = [req.body.email];
  db.query(sql, vals, (err, data) => {
    if (err) return res.json({ Error: "Error in login check the credentials" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, result) => {
          if (err)
            return res.json({ Error: "Password hashing issue in server side" });
          if (result) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "bqusp-yash-psuqb", {
              expiresIn: "1d",
            });
            res.cookie("token", token, { httpOnly: true });
            return res.json({ Status: "Success" });
          } else {
            return res.json({ message: "Password Not Matched" });
          }
        }
      );
    } else {
      return res.json({ message: "Email Not Found" });
    }
  });
});

app.listen(3565, () => {
  console.log("Server Listening at port 3565");
});
