import Image from "next/image";
import StixorLogo from "../../public/stixor-horizontal.png";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background backdrop-blur-xl">
      <div className="flex h-full items-center justify-between w-full">
        <Image
          src={StixorLogo}
          alt="Stixor Logo"
          className="h-auto w-2/5 md:h-4/5 md:w-auto"
        />
        <a target="_bland" href="https://stixor.com">
          <Button variant="accent" className="rounded-full">
            Visit Website
          </Button>
        </a>
      </div>
    </header>
  );
}
