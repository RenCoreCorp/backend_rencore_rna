const { check, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const config = process.env;
// Function that validates and sends back response

const validationHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else next();
}

const validateSignUpUser = [
    check('first_name').not().isEmpty().isLength({max: 100}),
    check('last_name').not().isEmpty().isLength({max: 100}),
    check('password').not().isEmpty().isLength({min: 6, max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    check('number').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateSignUpGuest = [
  check('first_name').not().isEmpty().isLength({max: 100}),
  check('last_name').not().isEmpty().isLength({max: 100}),
  check('number').not().isEmpty().isLength({max: 100}),
  validationHandler
]



const validateLoginUser = [
    check('password').not().isEmpty().isLength({max: 100}),
    check('email').not().isEmpty().isEmail().isLength({max: 100}),
    validationHandler
]

const validateGetDocument = [
    check('user_id').not().isEmpty().isInt(),
    validationHandler
]

const verifyToken = async (req, res, next) => {
    const token =
      req.body.token || req.query.token || 
      req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("Для аутентификации требуется токен");
    }
    try {
      // const decoded = jwt.verify(token, config.SESSION_SECRET);
      // req.decoded;

      const decoded = await jwt_decode(token, config.SESSION_SECRET);
      return res.status(200).send(decoded);
    } catch (err) {
      return res.status(401).send("Неверный токен");
    }
    return next();
  };

module.exports = {
    validateSignUpUser,
    validateLoginUser,
    validateGetDocument,
    verifyToken,
    validateSignUpGuest
}
