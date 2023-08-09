import * as React from "react";
import Input from "@/components/inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import axios from "axios";
import { toast } from "react-toastify";

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
    accept: z.literal(true, {
      errorMap: () => ({
        message: "Please agree to all terms and conditions before continuing",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password does not match",
    path: ["confirmpassword"],
  });
type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // add to db
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/signup", { ...values });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      //  console.log(error);
      toast.error(error.response.data.message);
    }
  };
  //validate password score
  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);
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
        {watch().password?.length > 0 && (
          <div className="flex mt-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl ${
                    passwordScore <= 2
                      ? "bg-red-400"
                      : passwordScore < 4
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}
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
        <input
          type="checkbox"
          id="accpent"
          className="mr-2 focus:ring rounded"
          {...register("accept")}
        />
        <label htmlFor="accept" className="text-gray-700 my-4">
          {" "}
          I accept the{" "}
          <a href="" target="_blank" className="text-blue-500 cursor-pointer">
            Terms and Conditions
          </a>
        </label>
        <div>
          {errors?.accept && (
            <p className="text-red-600 text-sm">{errors?.accept?.message}</p>
          )}
        </div>
        <SlideButton
          type="submit"
          text="Sign Up"
          slide_text="Secure Sign Up"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
