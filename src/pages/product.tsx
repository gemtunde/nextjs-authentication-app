import Input from "@/components/inputs/Input";
import * as React from "react";
import { RiProductHuntFill } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SlideButton from "@/components/buttons/SlideButton";
import { toast } from "react-toastify";
import axios from "axios";

interface IProductProps {}

const ProductSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product Name must be more than 3 letters")
    .max(24, "Product Name must be at most 24 letters"),
  // .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
  product_description: z
    .string()
    .min(3, "Product Description must be more than 3 letters")
    .max(24, "Product Description must be at most 64 letters"),
  product_price: z
    .string()
    .min(3, "Product Price must be more than 3 letters")
    .max(9, "Product Price must be at most 9 letters"),
  product_quantity: z
    .string()
    .min(1, "Product Quantity must be more than 3 letters")
    .max(4, "Product Quantity must be at most 4 letters"),
  product_image: z.string(),
});

type ProductSchemaType = z.infer<typeof ProductSchema>;

const Product: React.FunctionComponent<IProductProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });

  //add to db
  const onSubmit: SubmitHandler<ProductSchemaType> = async (values: any) => {
    const formData: any = {
      ...values,
      product_price: Number(values.product_price),
      product_quantity: Number(values.product_quantity),
    };
    // console.log(data);
    try {
      const { data } = await axios.post("/api/auth/product", { ...formData });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full px-12 py-6 flex flex-col items-center justify-center gap-2 ">
      <h2 className="text-xl text-gray-600 text-bold">Add Products</h2>
      <form className="w-full my-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="product_name"
          label="Product Name"
          type="text"
          icon={<RiProductHuntFill />}
          placeholder="Enter Product Name"
          register={register}
          error={errors?.product_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="product_description"
          label="Product Description"
          type="text"
          icon={<RiProductHuntFill />}
          placeholder="Enter Product Description"
          register={register}
          error={errors?.product_description?.message}
          disabled={isSubmitting}
        />
        <Input
          name="product_price"
          label="Product Price"
          type="text"
          icon={<RiProductHuntFill />}
          placeholder="Enter Product Price"
          register={register}
          error={errors?.product_price?.message}
          disabled={isSubmitting}
        />
        <Input
          name="product_quantity"
          label="Product Quantity"
          type="text"
          icon={<RiProductHuntFill />}
          placeholder="Enter Product Quantity"
          register={register}
          error={errors?.product_quantity?.message}
          disabled={isSubmitting}
        />
        <Input
          name="product_image"
          label="Image url"
          type="text"
          icon={<RiProductHuntFill />}
          placeholder="Enter Image Url"
          register={register}
          error={errors?.product_image?.message}
          disabled={isSubmitting}
        />
        <SlideButton
          type="submit"
          text="Add Product"
          slide_text="Unique Product"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Product;
