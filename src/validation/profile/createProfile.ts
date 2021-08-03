import { body } from "express-validator";

const cpValidateHandle = () => {
  return body("handle")
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("handle must be between 3 and 40 characters");
};

const cpValidateStatus = () => {
  return body("status")
    .trim()
    .not()
    .isEmpty()
    .withMessage("status is required");
};

const cpValidateSkills = () => {
  return body("skills")
    .trim()
    .not()
    .isEmpty()
    .withMessage("skills is required");
};

const cpValidateUrl = (key: string) => {
  return body(key)
    .trim()
    .isURL()
    .optional({ nullable: true })
    .withMessage("not a valid url");
};

export { cpValidateHandle, cpValidateStatus, cpValidateSkills, cpValidateUrl };
