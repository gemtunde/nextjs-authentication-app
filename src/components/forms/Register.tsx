import * as React from "react";
import Input from "@/components/inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";

interface IRegisterFormProps {}

const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "First name must be atleast 3 characters")
      .max(24, "First name must be atmost 24 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    last_name: z
      .string()
      .min(3, "Last name must be atleast 3 characters")
      .max(24, "Last name must be atmost 24 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    email: z.string().email("Please enter a valid emaill address."),
    phone: z.string().refine(validator.isMobilePhone),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(24, "Password must be atmost 24 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password does not match",
    path: ["confirmpassword"],
  });
type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2">
        <Input
          name="first_name"
          label="First Name"
          type="text"
          icon={<CiUser />}
          placeholder="first name"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last Name"
          type="text"
          icon={<CiUser />}
          placeholder="last name"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="email"
          label="Email Address"
          type="text"
          icon={<FiMail />}
          placeholder="email@email.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="phone"
          label="Phone Number"
          type="text"
          icon={<BsTelephone />}
          placeholder="+(xxx) xxx xxx xxx"
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        <Input
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmpassword?.message}
          disabled={isSubmitting}
        />
        <button className=" bg-blue-700 text-white py-2 px-4 w-[100%] rounded-md mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
