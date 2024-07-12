import User from "../models/user.js";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthorized = async (req, res, next) => {
  if (!req.headers.cookie) throw new UnauthorizedError("please login!");
  const token = req.headers.cookie.slice(6);
  const decoded = await verifyToken(token);
  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) throw new UnauthorizedError("invalid user");
  req.user = {
    id: user._id,
    isAdmin: user.isAdmin,
  };
  next();
};

export const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("you are not allowed to access this route");
  next();
};
