// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "@/components/models/User";
import connectDb from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { CREATE_ACTIVATION_TOKEN } = process.env;

interface IUserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //res.status(200).json({ name: 'John Doe' })
    await connectDb();
    const { token } = req.body;
    const userToken = jwt.verify(token, CREATE_ACTIVATION_TOKEN!) as IUserToken;
    const userDb = await User.findById(userToken.id);
    if (userDb.emailVerified === true) {
      res.status(400).json({
        message: "Email already verified",
      });
    }
    await User.findByIdAndUpdate(userDb.id, { emailVerified: true });
    res.json({
      message:
        "User Verify success. Please  you have successsfully activate your account",
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
