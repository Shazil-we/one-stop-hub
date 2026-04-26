import { AddEventField } from './AddEventField';
import { extractUserFullInfo } from '@/Queries/Users';
export default async function ManageEventsButton() {
    const user = (await extractUserFullInfo())!;
     return (
        <>
            <div className="z-50">
                <AddEventField userRole={user.role} />
            </div>
        </>

    )
}