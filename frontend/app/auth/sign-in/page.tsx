"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import StixorLogo from "../../../public/stixor-logo-transparent.png";
import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <Image
          src={StixorLogo}
          alt="Stixor Chat Logo"
          className="mb-2 h-auto w-1/5"
        />
        <h1 className="mb-8 text-2xl font-bold">Login to Stixor Chat</h1>
      </div>

      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        size={"withIcon"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="25px"
          height="25px"
          fill="white"
          className="mr-2"
        >
          {" "}
          <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" />
        </svg>
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignIn;
