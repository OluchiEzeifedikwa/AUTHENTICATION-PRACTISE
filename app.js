const path = require('node:path');
const express = require("express");
const auth = require('./routes/auth');
const usersRouter = require('./routes/usersRouter');
const dbClient = require("./db/pool");
const app = express();



const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use(usersRouter);




// const links = [
//   {href: "/", text: "HOME"},
//   {href: "/log-in", text: "LOGIN"},
//   {href: "/sign-up", text: "SIGNUP"},
// ];

// app.get('/', (req, res) => {
//   console.log(links);
//   res.render('index', { links: links });
// });

// app.get('/log-in', (req, res) => {
//   res.render('log-in', { links: links });
// });

// app.get('/sign-up', (req, res) => {
//   res.render('sign-up-form', { links: links });
// });



const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log("app listening on port 3000!"));




