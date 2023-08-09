import Background from "@/components/Backgrounds/Background";
import RegisterForm from "@/components/forms/Register";
import Link from "next/link";
import React from "react";

const auth = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Form */}
        <div className="w-full sm:w-5/6 border border-black md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center">
          <div className="w-full px-12 py-4">
            <h2 className="text-center text-2xl font-bold text-gray-800 tracking-wide">
              Sign up
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              You already have an account ?
              <Link
                href=""
                className="cursor-pointer bg-blue-500 ml-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </Link>
            </p>
            {/* SIgnup form here */}
            <RegisterForm />
            {/* SIgnup form here */}
          </div>
        </div>

        {/* Background Image */}
        <Background image="/auth/register.jpg" />
      </div>
    </div>
  );
};

export default auth;
