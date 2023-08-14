import jwt from "jsonwebtoken";
const { CREATE_ACTIVATION_TOKEN, RESET_TOKEN_SECRET } = process.env;

export const createToken = (payload: any) => {
  return jwt.sign(payload, CREATE_ACTIVATION_TOKEN!, {
    expiresIn: "2d",
  });
};
export const createResetToken = (payload: any) => {
  return jwt.sign(payload, RESET_TOKEN_SECRET!, {
    expiresIn: "3h",
  });
};
