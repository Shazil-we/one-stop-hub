import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default async function HomeCards(){
    const CardsInfo = [
        {
            title: "Total Active Societies",
            stat: 15
        },
        {
            title: "Events This Month",
            stat: 4
        },
        {
            title: "Total Venues Available",
            stat: 15
        },  
    ]
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-8xl">
                {CardsInfo.map((CardInfo , index)=>(
                    <Card 
                    key={index}
                    className="w-[260px] h-[200px] md:m-4 lg:mr-6 bg-white/80  dark:bg-black/80 shadow-lg hover:shadow-2xl transition-shadow duration-300 my-6 lg:my-8"
                    >
                        <CardHeader>
                            <CardTitle className="text-md lg:text-xl font-bold ">{CardInfo.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-7xl font-extrabold text-center">{CardInfo.stat}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )   
}