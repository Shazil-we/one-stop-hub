import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractAllUsers } from "@/Queries/Users";
import UserInput from "./UserInput";
import UserRowActions from "./UserRowActions";

export default async function ManageUsersTable({
    searchParams,
}: {
    searchParams: Promise<{ user?: string }>;
}) {
    const resolvedParams = await searchParams;
    const userFilter = resolvedParams?.user?.toLowerCase() || "";

    const allUsers = await extractAllUsers();
    const filteredUsers = allUsers.filter((user) =>
        user.full_name.toLowerCase().includes(userFilter)
    );

    const userCols = ["User Id", "Full Name", "Email", "Role", "Joined", "Actions"];

    return (
        <>
            <div className="flex-col mt-12 hidden md:flex w-full max-w-4xl">
                <div className="flex items-center justify-between">
                    <UserInput />
                </div>
                <Table className="mt-8">
                    <TableCaption>All Registered Users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {userCols.map((col, index) => (
                                <TableHead key={index}>{col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.user_id}</TableCell>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell><UserRowActions user={user} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
