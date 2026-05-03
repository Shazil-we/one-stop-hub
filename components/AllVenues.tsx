import { cn } from "@/lib/utils";
import { BentoGrid } from "@/components/ui/bento-grid";
import { extractVenues } from "@/Queries/Venues";
import { MapPin, Users, Building2 } from "lucide-react";

const VenueBentoCard = ({
    className,
    venueName,
    locationBuilding,
    capacity,
    venueType,
}: {
    className?: string;
    venueName: string;
    locationBuilding: string;
    capacity: number;
    venueType: string;
}) => {
    return (
        <div
            className={cn(
                "group/bento relative overflow-hidden shadow-input row-span-1 flex flex-col justify-end rounded-xl border border-border bg-card text-card-foreground transition duration-200 hover:shadow-xl dark:shadow-none",
                className
            )}
        >
            {/* Decorative textured background that fades out */}
            <div className="absolute inset-0 dark:bg-dot-white/[0.07] bg-dot-black/[0.05] [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)] pointer-events-none" />

            {/* Gradient overlay to blend the top dots into the card */}
            <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-muted/50 to-transparent pointer-events-none rounded-xl" />

            {/* Content anchored to bottom */}
            <div className="relative z-10 p-6 pt-0">
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                    <h2 className="font-sans text-4xl font-black text-foreground leading-none tracking-tight mb-4">
                        {venueName}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                            <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                            {locationBuilding}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                            <Users className="h-3 w-3 shrink-0 text-muted-foreground" />
                            {capacity.toLocaleString()} seats
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground">
                            <Building2 className="h-3 w-3 shrink-0 text-muted-foreground" />
                            {venueType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function AllVenues() {
    const venues = await extractVenues();

    return (
        <>
            <BentoGrid className="max-w-4xl mx-auto mt-12 md:auto-rows-[14rem]">
                {venues.map((venue, i) => {
                    let dynamicClass = "md:col-span-2";
                    if (i % 4 === 0 || i % 4 === 3) {
                        dynamicClass = "md:col-span-3";
                    }
                    return (
                        <VenueBentoCard
                            key={i}
                            venueName={venue.venue_name}
                            locationBuilding={venue.location_building}
                            capacity={venue.capacity}
                            venueType={venue.venue_type}
                            className={dynamicClass}
                        />
                    );
                })}
            </BentoGrid>
        </>
    );
}
