const {check} = require('express-validator')

module.exports = [
    check('name').matches(/^[a-zA-Z ]{2,30}$/),
    check('email').isEmail(),
    check('password').matches("^(?=.*[0-9])"),
    check('PasswordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
]