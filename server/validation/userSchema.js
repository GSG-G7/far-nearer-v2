const yup = require('yup');

exports.signInSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});
