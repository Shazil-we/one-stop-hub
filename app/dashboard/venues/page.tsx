import AllVenues from "@/components/AllVenues";
import EncryptedHeading from "@/components/EncryptedHeading";

export default async function venues() {
    return (
        <>
            <div className="mt-18">
                <h1 className="text-8xl font-extrabold text-left">
                    <EncryptedHeading text="Venues" />
                </h1>
            </div>
            <AllVenues />
        </>
    )
}
