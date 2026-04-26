import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { extractUserFullInfo } from "@/Queries/Users";
import HomeEvents from "@/components/HomeEvents";
import HomeCards from "@/components/HomeCards";
export default async function DashboardHomePage() {
  const User = await extractUserFullInfo();
  return (
    <>
      <div className="relative flex h-[30rem] w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center">

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60 "
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-7xl p-4">
            Welcome {User?.full_name}.<br /><span className="text-3xl md:text-5xl z-100">Select an option to get started.</span>
          </h1>
        </div>
      </div>
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
