import * as React from "react";
import Input from "@/components/inputs/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiLock } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

interface ILoginFormProps {
  callbackUrl: string;
  csrfToken: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid emaill address."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(24, "Password must be atmost 24 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const { callbackUrl, csrfToken } = props;
  const router = useRouter();
  const path = router.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // add to db
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });
    //console.log(res);
    // toast.success(data.message);
    if (res.error) {
      return toast.error(res.error);
    } else {
      return router.push("/");
    }
  };

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold text-gray-800 tracking-wide">
        Login
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        You do not have an account ? Signup
        <Link
          href=""
          onClick={() => {
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            });
          }}
          className="cursor-pointer bg-blue-500 ml-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </p>
      <form
        method="post"
        action="/api/auth/signin/email"
        className="w-full my-8 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="gap-2">
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
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
            name="password"
            label="Password"
            type="password"
            icon={<FiLock />}
            placeholder="***********"
            register={register}
            error={errors?.password?.message}
            disabled={isSubmitting}
          />
          <div></div>
          <SlideButton
            type="submit"
            text="Login "
            slide_text="Secure Login"
            icon={<FiLock />}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
