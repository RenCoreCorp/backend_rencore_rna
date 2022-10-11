const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db.js');

/*
Easy way to generate key using crypto:
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
*/

passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
          // Check if user exists
          db.query(`SELECT * FROM users WHERE email = $1`, [email], (err, result) => {
            if (err) {
              return done(null, false, { message: 'Возникла проблема со входом.' });
            }
            const user = result.rows[0];
            if (!user) {
              return done(null, false, { message: 'Неправильный адрес электронной почты или пароль.' });
            }

            // Compare entered password with hash stored in database
            bcrypt.compare(password, user.pwd_hash, (err, result) => {
              if (err) {
                return done(null, false, { message: 'Возникла проблема со входом.' });
              }
              if (result) {
                return done(null, user, { message: 'Успешная авторизация' });
              } else {
                return done(null, false, { message: 'Неправильный адрес электронной почты или пароль.' });
              }
            });
          });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query(`SELECT id, email, first_name, last_name FROM users WHERE id = $1`, [id], (err, result) => {
      if (err) {
        return done(err);
      }
      const user = result.rows[0];
      done(null, user);
    });
});