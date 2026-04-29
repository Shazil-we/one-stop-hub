import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractAllRequests } from "@/Queries/Requests";
import ApproveRequestCheckbox from "./ApproveRequestCheckbox";
import RequestRowActions from "./RequestRowActions";

export default async function ManageRequestsTable() {
    const requests = await extractAllRequests();
    const requestCols = [
        "Request Id",
        "User Name",
        "Email",
        "Requested Role",
        "Status",
        "Reviewed By",
        "Approve",
        "Actions",
    ];

    return (
        <div className="flex-col mt-12 hidden md:flex w-full max-w-5xl">
            <Table className="mt-8">
                <TableCaption>All Role Change Requests</TableCaption>
                <TableHeader>
                    <TableRow>
                        {requestCols.map((col, index) => (
                            <TableHead key={index}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => {
                        const isPending = request.status === "Pending";
                        return (
                            <TableRow key={request.request_id}>
                                <TableCell>{request.request_id}</TableCell>
                                <TableCell>{request.full_name}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.requested_role}</TableCell>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>{request.reviewed_by || "-"}</TableCell>
                                <TableCell>
                                    <ApproveRequestCheckbox
                                        requestId={String(request.request_id)}
                                        approved={!isPending}
                                    />
                                </TableCell>
                                <TableCell><RequestRowActions request={request} /></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
