import { extractUserFullInfo } from '@/Queries/Users';
import { AddSocietyField } from './AddSocietyField';
export default async function ManageSocietyButton() {
     return (
        <>
            <div className="z-50">
                <AddSocietyField  />
            </div>
        </>

    )
}