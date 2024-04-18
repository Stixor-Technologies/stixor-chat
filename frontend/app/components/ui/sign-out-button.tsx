"use client";

import { Button } from "./button";
import { signOut } from "next-auth/react";

const SignOutButton: React.FC = () => {
  return (
    <a>
      <Button
        variant="accent"
        className="rounded-full"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </a>
  );
};

export default SignOutButton;
