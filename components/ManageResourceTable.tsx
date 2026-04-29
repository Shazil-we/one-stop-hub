import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractResources } from "@/Queries/Resources";
import ResourceInput from "./ResourceInput";
import ManageResourceButton from "./ManageResourceButton";
import ResourceRowActions from "./ResourceRowActions";

export default async function ManageResourceTable({
    searchParams,
}: {
    searchParams: Promise<{ resource?: string }>;
}) {
    const resolvedParams = await searchParams;
    const resourceNameFilter = resolvedParams?.resource?.toLowerCase() || "";

    const allResources = await extractResources();
    const filteredResources = allResources.filter((resource) =>
        resource.item_name.toLowerCase().includes(resourceNameFilter)
    );
    const resourceCols = ["Resource Id", "Resource Name", "Total Inventory", "Actions"];

    return (
        <div className="flex-col w-full max-w-4xl mt-12 hidden md:flex">
            <div className="flex items-center justify-between">
                <ResourceInput />
                <ManageResourceButton />
            </div>
            <Table className="mt-8 w-full">
                <TableCaption>All Current Resources</TableCaption>
                <TableHeader>
                    <TableRow>
                        {resourceCols.map((col, index) => (
                            <TableHead key={index} className="text-left font-bold">{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredResources.map((resource, index) => (
                        <TableRow key={index}>
                            <TableCell>{resource.resource_id}</TableCell>
                            <TableCell>{resource.item_name}</TableCell>
                            <TableCell>{resource.total_inventory}</TableCell>
                            <TableCell><ResourceRowActions resource={resource} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
