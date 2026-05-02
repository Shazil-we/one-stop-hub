
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { fetchAllSocieties } from "@/Queries/Societies";


const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-border bg-muted"></div>
);


export default async function AllSocieties() {
    const Societies = await fetchAllSocieties();
    return (
        <>
            <BentoGrid className="max-w-4xl mx-auto mt-12 md:auto-rows-[20rem]">
                {Societies.map((Society, i) => {
                    let dynamicClass:string = "md:col-span-2";
                    if(i%4 ==0 || i%4 == 3){
                        dynamicClass = "md:col-span-3";
                    }
                    return (
                        <BentoGridItem
                            key={i}
                            title={Society.society_name}
                            description={Society.description}
                            header={<Skeleton />}
                            className={dynamicClass}
                        />
                    )
                }


                )}
            </BentoGrid>
        </>
    )
}