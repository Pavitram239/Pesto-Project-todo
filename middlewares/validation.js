import { body, param, validationResult } from "express-validator";
import User from "../models/user.js";
import Task from "../models/task.js";
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/errors.js";
import { STATUS } from "../utils/constants.js";
import mongoose from "mongoose";

const withValidationResult = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsgs = errors.array().map((error) => error.msg);
        if (errMsgs[0].includes("already exists"))
          throw new BadRequestError(errMsgs[0]);
        if (errMsgs[0].includes("not found"))
          throw new NotFoundError(errMsgs[0]);
        if (errMsgs[0].includes("invalid"))
          throw new BadRequestError(errMsgs[0]);
        throw new BadRequestError(errMsgs);
      }
      next();
    },
  ];
};

export const registerInputValidator = withValidationResult([
  body("name").isString().notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new BadRequestError("user already exists");
    }),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should atleast container 8 characters"),
]);

export const loginInputValidator = withValidationResult([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) throw new BadRequestError("user not found");
      if (!user.verified)
        throw new ValidationError("please verified your email");
    }),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should atleast container 8 characters"),
]);

export const idValidator = withValidationResult([
  param("id").custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError("invalid mongodb id");
    const task = await Task.findById(value);
    if (!task) throw new NotFoundError("task not found");
  }),
]);

export const taskInputValidator = withValidationResult([
  body("title").isString().notEmpty().withMessage("title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  body("status")
    .isString()
    .notEmpty()
    .withMessage("status is required")
    .custom(async (value) => {
      const isValid = Object.values(STATUS).includes(value);
      if (!isValid) throw new BadRequestError("invalid status");
    }),
]);
