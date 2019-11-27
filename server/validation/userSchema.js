const yup = require('yup');

exports.signUpSchema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .min(2, 'Seems a bit short...')
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match '),
});

exports.signInSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});
