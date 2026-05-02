import { AddEventField } from './AddEventField';
import { getCurrentUser } from '@/lib/current-user';
export default async function ManageEventsButton() {
    const user = (await getCurrentUser())!;
     return (
        <>
            <div className="z-50">
                <AddEventField userRole={user.role} />
            </div>
        </>

    )
}