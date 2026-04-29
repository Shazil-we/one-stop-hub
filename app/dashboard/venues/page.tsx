import AllVenues from "@/components/AllVenues";

export default async function venues() {
    return (
        <>
            <div className="mt-18">
                <h1 className="text-8xl font-extrabold text-left">
                    Venues
                </h1>
            </div>
            <AllVenues />
        </>
    )
}
