import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { fetchSocietyCount } from "@/Queries/Societies";
import { fetchEventsThisMonthCount } from "@/Queries/Events";
import { fetchVenueCount } from "@/Queries/Venues";

export default async function HomeCards() {
    const [societyCount, eventsThisMonth, venueCount] = await Promise.all([
        fetchSocietyCount(),
        fetchEventsThisMonthCount(),
        fetchVenueCount(),
    ]);

    const CardsInfo = [
        {
            title: "Total Active Societies",
            stat: societyCount,
        },
        {
            title: "Events This Month",
            stat: eventsThisMonth,
        },
        {
            title: "Total Venues Available",
            stat: venueCount,
        },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-8xl">
                {CardsInfo.map((CardInfo, index) => (
                    <Card
                        key={index}
                        className="w-[260px] h-[200px] md:m-4 lg:mr-6 bg-card/80 text-card-foreground shadow-lg hover:shadow-2xl transition-shadow duration-300 my-6 lg:my-8"
                    >
                        <CardHeader>
                            <CardTitle className="text-md lg:text-xl font-bold">{CardInfo.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-7xl font-extrabold text-center">{CardInfo.stat}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}