import AllEvents from "@/components/AllEvents";
import EncryptedHeading from "@/components/EncryptedHeading";

export default async function events(){
    return(
        <>  
            <div className="mt-18">
                <h1 className="text-8xl font-extrabold text-left">
                    <EncryptedHeading text="Events" />
                </h1>
            </div>
            <AllEvents/>
        </>
    )
}