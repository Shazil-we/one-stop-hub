import { getCurrentUser } from "@/lib/current-user";
import HomeEvents from "@/components/HomeEvents";
import HomeCards from "@/components/HomeCards";
import DashboardHero from "@/components/DashboardHero";
export default async function DashboardHomePage() {
  const User = await getCurrentUser();
  return (
    <>
      <DashboardHero fullName={User?.full_name ?? "User"} />
      <div className=" mt-4 mx-auto max-w-8xl  ">
        <h2 className="font-extrabold text-4xl md:text-6xl text-left">
          Overview.
        </h2>
        <HomeCards/>
      </div>
      <div className=" mt-4 mx-auto max-w-8xl p-10">
        <h2 className="font-extrabold text-4xl md:text-6xl">
          Upcoming Events.
        </h2>
        <HomeEvents />
      </div>
    </>
  );
}
