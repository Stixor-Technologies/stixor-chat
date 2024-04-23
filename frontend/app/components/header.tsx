import Image from "next/image";
import StixorLogo from "../../public/stixor-horizontal.png";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "./ui/sign-out-button";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl">
      <div className="flex h-full w-full items-center justify-between">
        <Image
          src={StixorLogo}
          alt="Stixor Logo"
          className="h-auto w-2/5 md:h-4/5 md:w-auto"
        />
        <div className="flex gap-2">
          <a target="_bland" href="https://stixor.com">
            <Button variant="accent" className="rounded-full">
              Visit Website
            </Button>
          </a>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
