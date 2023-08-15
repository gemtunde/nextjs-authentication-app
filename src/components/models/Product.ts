import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
  },
  product_quantity: {
    type: Number,
  },
  product_image: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png",
  },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
