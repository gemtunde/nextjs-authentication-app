// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "@/components/models/User";
import connectDb from "@/utils/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createToken } from "@/utils/tokens";
import sendMail from "@/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //res.status(200).json({ name: 'John Doe' })
    await connectDb();
    const { first_name, email, phone, last_name, password } = req.body;
    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please add valid email address" });
    }
    if (!validator.isMobilePhone(phone)) {
      return res.status(400).json({ message: "Please add valid phone number" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greate than 6 characters" });
    }
    //user model
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "This email address aleady exist" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      first_name,
      last_name,
      email,
      phone,
      password: cryptedPassword,
    });
    await newUser.save();
    const activateToken = createToken({
      id: newUser._id.toString(),
    });
    const url = `${process.env.NEXTAUTH_URL}/activate/${activateToken}`;
    await sendMail(
      newUser.email,
      newUser.first_name,
      "",
      url,
      "Activate your Account - Next-Authentication",
      activateTemplateEmail
    );
    res.json({
      message: "User success. Please check your email to activate account",
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
