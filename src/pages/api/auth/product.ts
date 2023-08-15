import Product from "@/components/models/Product";
import connectDb from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const {
      product_description,
      product_image,
      product_name,
      product_price,
      product_quantity,
    } = req.body;

    if (
      !product_description ||
      !product_name ||
      !product_price ||
      !product_quantity
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    //user model
    const newProduct = await new Product({
      product_description,
      product_image,
      product_name,
      product_price,
      product_quantity,
    });
    await newProduct.save();
    res.status(200).json({
      message: "product saved successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
