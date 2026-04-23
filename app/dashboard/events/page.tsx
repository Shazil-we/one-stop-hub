import AllEvents from "@/components/AllEvents";

export default async function events(){
    return(
        <>  
            <div className="mt-18">
                <h1 className="text-8xl font-extrabold text-left">
                    Events
                </h1>
            </div>
            <AllEvents/>
        </>
    )
}