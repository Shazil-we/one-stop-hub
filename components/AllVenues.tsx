import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { extractVenues } from "@/Queries/Venues";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

export default async function AllVenues() {
    const venues = await extractVenues();

    return (
        <>
            <BentoGrid className="max-w-4xl mx-auto mt-12 md:auto-rows-[20rem]">
                {venues.map((venue, i) => {
                    let dynamicClass = "md:col-span-2";
                    if (i % 4 === 0 || i % 4 === 3) {
                        dynamicClass = "md:col-span-3";
                    }

                    return (
                        <BentoGridItem
                            key={i}
                            title={venue.venue_name}
                            description={`${venue.location_building} | Capacity: ${venue.capacity} | ${venue.venue_type}`}
                            header={<Skeleton />}
                            className={dynamicClass}
                        />
                    )
                })}
            </BentoGrid>
        </>
    )
}
