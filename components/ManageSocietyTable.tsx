import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { extractSocietiesFullInfo } from "@/Queries/Societies";
import EventInput from "./EventInput";
import ManageSocietyButton from "./ManageSocietyButton";
import SocietyRowActions from "./SocietyRowActions";

export default async function ManageSocietyTable({
    searchParams,
}: {
    searchParams: Promise<{ society?: string }>;
}) {
    const resolvedParams = await searchParams;
    const Sname = resolvedParams?.society || "";
    const AllSocs = await extractSocietiesFullInfo();
    const SocietyCols = ["Society Id", "Society Name", "Society Head Name", "Established Date", "Actions"];

    return (
        <>
            <div className="flex-col mt-12 hidden md:flex w-full max-w-4xl">
                <div className="flex items-center justify-between">
                    <EventInput />
                    <ManageSocietyButton/>
                </div>
                <Table className="mt-8">
                    <TableCaption>All Current Societies</TableCaption>
                    <TableHeader className="mx-auto ">
                        <TableRow className="">
                            {SocietyCols.map((col, index) => (
                                <TableHead key={index} className=""> {col} </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="mx-auto">
                        {AllSocs.map((Society, index) => {
                            return (
                                <TableRow key={index} className="text-center">
                                    <TableCell>{Society.society_id}</TableCell>
                                    <TableCell>{Society.society_name}</TableCell>
                                    <TableCell>{Society.society_head_name}</TableCell>
                                    <TableCell>{new Date(Society.established_date).toLocaleDateString()}</TableCell>
                                    <TableCell><SocietyRowActions society={{ ...Society, logo_base64: Society.logo_base64 ?? null, society_head_email: Society.society_head_email ?? "" }} /></TableCell>
                                </TableRow>
                            )
                        })}     
                    </TableBody>
                </Table>
            </div>
        </>
    )
}