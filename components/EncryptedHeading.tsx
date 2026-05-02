"use client";

import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

type EncryptedHeadingProps = {
  text: string;
  className?: string;
};

export default function EncryptedHeading({
  text,
  className,
}: EncryptedHeadingProps) {
  return (
    <EncryptedText
      text={text}
      className={cn(className)}
      encryptedClassName="text-muted-foreground"
      revealedClassName="text-foreground"
      revealDelayMs={35}
      flipDelayMs={40}
    />
  );
}
