import { validationResult } from "express-validator";

// const validation = (schema) => {
//   return (req, res, next) => {
//     let inputs = { ...req.body, ...req.params, ...req.query };
//     let { error } = schema.validate(inputs, { abortEarly: false });
//     if (error) {
//       let errors = error.details.map((d) => {
//         d.message;
//       });
//       res.status(400).json(errors);
//     } else {
//       next();
//     }
//   };
// };

// export default validation;

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

export default validator;
