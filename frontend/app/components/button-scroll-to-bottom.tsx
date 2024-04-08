"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { ArrowDownIcon } from "@radix-ui/react-icons";

interface ButtonScrollToBottomProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ButtonScrollToBottom({
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`fixed bottom-24 right-4 z-10 h-10 transition-all duration-300 sm:right-8 md:bottom-32
      ${isAtBottom ? "opacity-0" : "opacity-100"}`}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ArrowDownIcon />
      {/* BUTTON */}
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
