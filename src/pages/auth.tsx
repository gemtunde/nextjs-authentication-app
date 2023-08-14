import Background from "@/components/Backgrounds/Background";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";

const auth = ({ tab }: { tab: string }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Form */}
        <div className="w-full sm:w-2/3 border border-black md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center">
          {/* SIgnup form here */}
          {/**/}
          {tab === "signin" ? <LoginForm /> : <RegisterForm />}

          {/* SIgnup form here */}
        </div>
      </div>

      {/* Background Image */}
      <Background
        image={`/auth/${tab === "signin" ? "login" : "register"}.jpg`}
      />
    </div>
  );
};

export default auth;

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";

  return {
    props: { tab: JSON.parse(JSON.stringify(tab)) },
  };
}
