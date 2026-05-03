import { cn } from "@/lib/utils";
import { BentoGrid } from "@/components/ui/bento-grid";
import { fetchAllSocieties } from "@/Queries/Societies";
import { CalendarDays, Users } from "lucide-react";

const SocietyBentoCard = ({
    className,
    societyName,
    description,
    establishedDate,
    logoBase64,
}: {
    className?: string;
    societyName: string;
    description: string;
    establishedDate: string;
    logoBase64: string | null;
}) => {
    const year = new Date(establishedDate).getFullYear();

    return (
        <div
            className={cn(
                "group/bento relative overflow-hidden shadow-input row-span-1 flex flex-col justify-end rounded-xl border border-border bg-card text-card-foreground transition duration-200 hover:shadow-xl dark:shadow-none",
                className
            )}
        >
            {/* Dot-grid texture background fading out at bottom */}
            <div className="absolute inset-0 dark:bg-dot-white/[0.07] bg-dot-black/[0.05] [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-muted/50 to-transparent pointer-events-none rounded-xl" />

            {/* Small square logo — top right */}
            <div className="absolute top-4 right-4 z-20">
                {logoBase64 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={logoBase64}
                        alt={`${societyName} logo`}
                        className="h-11 w-11 rounded-lg object-contain bg-background border border-border shadow-sm"
                    />
                ) : (
                    <div className="h-11 w-11 rounded-lg border border-border bg-muted/60 flex items-center justify-center shadow-sm">
                        <Users className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                )}
            </div>

            {/* Content anchored to bottom */}
            <div className="relative z-10 p-6 pt-0">
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                    <h2 className="font-sans text-2xl font-black text-foreground leading-tight tracking-tight mb-1">
                        {societyName}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                            <CalendarDays className="h-3 w-3 shrink-0 text-muted-foreground" />
                            Est. {year}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function AllSocieties() {
    const Societies = await fetchAllSocieties();
    return (
        <>
            <BentoGrid className="max-w-4xl mx-auto mt-12 md:auto-rows-[14rem]">
                {Societies.map((Society, i) => {
                    let dynamicClass = "md:col-span-2";
                    if (i % 4 === 0 || i % 4 === 3) {
                        dynamicClass = "md:col-span-3";
                    }
                    return (
                        <SocietyBentoCard
                            key={i}
                            societyName={Society.society_name}
                            description={Society.description}
                            establishedDate={Society.established_date}
                            logoBase64={Society.logo_base64}
                            className={dynamicClass}
                        />
                    );
                })}
            </BentoGrid>
        </>
    );
}