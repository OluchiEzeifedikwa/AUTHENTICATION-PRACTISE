const { Router } = require('express');
const auth = Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Pool} = require('pg');
const bcrypt = require('bcryptjs');
// const usersControllers = require('../controllers/usersControllers');

const pool = new Pool({
  connectionString: "postgresql://OluchiEze:mesh4199@localhost:5432/basic_users"
});


auth.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
auth.use(passport.initialize());
auth.use(passport.session());


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

auth.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });
  
auth.get("/sign-up", (req, res) => res.render("sign-up-form"));
auth.get("/log-in", (req, res) => res.render("log-in"));
auth.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  
auth.post("/sign-up", async (req, res, next) => {
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } 
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/passcode");
    }); 
    } catch(err) {
      return next(err);
    }
  });

  auth.post('/passcode', (req, res) => {
    const passcode = req.body.passcode;
    if (passcode === '2024') {
        res.redirect('/log-in');
    } else {
        res.send('Invalid Secret code');
    }
});

  
  auth.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/", 
      failureRedirect: "/"
    })
  
  );





// auth.get('/order', usersControllers.getUsernames)
// auth.get('/new', usersControllers.createUsernameGet)
// auth.post('/new', usersControllers.createUsernamePost)

  
  
  
// auth.post(
//     "/log-in",
//     passport.authenticate("local", {
//       successRedirect: "/", 
//       failureRedirect: "/"
//     })
  
//   );

module.exports = auth;
  