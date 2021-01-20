import * as yup from "yup";

export default yup.object().shape({
  userName: yup
    .string()
    .required("username is required")
    .min(3, "username must be 3 chars long"),
  email: yup
    .string()
    .email("Must be valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .required('password required'),
  terms: yup.boolean().oneOf([true], 'Must check Terms of Service'),
  //.required('Must check Terms of Service'),

});