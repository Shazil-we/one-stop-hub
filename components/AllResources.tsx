import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { extractResources } from "@/Queries/Resources";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-border bg-muted"></div>
);

export default async function AllResources() {
    const resources = await extractResources();

    return (
        <BentoGrid className="max-w-5xl mx-auto mt-10 md:auto-rows-[16rem]">
            {resources.map((resource, i) => {
                let dynamicClass = "md:col-span-2";
                if (i % 4 === 0 || i % 4 === 3) {
                    dynamicClass = "md:col-span-3";
                }

                return (
                    <BentoGridItem
                        key={resource.resource_id}
                        title={resource.item_name}
                        description={`Total Inventory: ${resource.total_inventory}`}
                        header={<Skeleton />}
                        className={dynamicClass}
                    />
                );
            })}
        </BentoGrid>
    );
}
