"use client";

import { EncryptedText } from "@/components/ui/encrypted-text";

type DashboardHeroProps = {
  fullName: string;
};

export default function DashboardHero({ fullName }: DashboardHeroProps) {
  return (
    <div className="relative flex h-[30rem] w-full overflow-hidden rounded-md bg-transparent antialiased md:items-center md:justify-center">
      
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="text-center text-4xl font-extrabold md:text-7xl p-4">
          <EncryptedText
            text={`Welcome ${fullName}.`}
            encryptedClassName="text-muted-foreground"
            revealedClassName="text-foreground"
            revealDelayMs={30}
            flipDelayMs={35}
          />
        </h1>
        <p className="text-center text-2xl md:text-5xl font-bold">
          <EncryptedText
            text="Select an option to get started."
            encryptedClassName="text-muted-foreground"
            revealedClassName="text-foreground"
            revealDelayMs={28}
            flipDelayMs={35}
          />
        </p>
      </div>
    </div>
  );
}
