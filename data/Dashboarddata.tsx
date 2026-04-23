import { 
  CalendarDaysIcon, 
  UsersIcon, 
  Settings2Icon, 
  MapPinIcon, 
  PackageIcon, 
  ClipboardCheckIcon 
} from "lucide-react";

export const STUDENT_NAV = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: <CalendarDaysIcon />,
    isActive: true,
    items: [
      { title: "View Events", url: "/dashboard/events" },
      { title: "My Tickets", url: "/dashboard/events/mytickets" },
    ],
  },
  {
    title: "Societies",
    url: "/dashboard/societies",
    icon: <UsersIcon />,
    items: [
      { title: "View Societies", url: "/dashboard/societies" },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings2Icon />,
    items: [
      { title: "General", url: "/dashboard/settings" },
    ],
  },
];

export const ADMINISTRATOR_NAV = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: <CalendarDaysIcon />,
    isActive: true,
    items: [
      { title: "View Events", url: "/dashboard/events" },
      { title: "My Tickets", url: "/dashboard/events/mytickets" },
      { title: "Manage Events", url: "/dashboard/events/manage" }
    ],
  },
  {
    title: "Societies",
    url: "/dashboard/societies",
    icon: <UsersIcon />,
    items: [
      { title: "View Societies", url: "/dashboard/societies" },
      { title: "Manage Societies", url: "/dashboard/societies/manage" }
    ],
  },
  {
    title: "Venues",
    url: "/dashboard/venues",
    icon: <MapPinIcon />,
    items: [
      { title: "View Venues", url: "/dashboard/venues" },
      { title: "Manage Venues", url: "/dashboard/venues/manage" }
    ],
  },
  {
    title: "Resources",
    url: "/dashboard/resources",
    icon: <PackageIcon />,
    items: [
      { title: "View Resources", url: "/dashboard/resources" },
      { title: "Manage Resources", url: "/dashboard/resources/manage" }
    ],
  },
  {
    title: "Requests",
    url: "/dashboard/requests",
    icon: <ClipboardCheckIcon />,
    items: [
      { title: "View requests", url: "/dashboard/requests" },
      { title: "Manage Requests", url: "/dashboard/requests/manage" }
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings2Icon />,
    items: [
      { title: "General", url: "/dashboard/settings" },
    ],
  },
];

export const SOCIETYHEAD_NAV = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: <CalendarDaysIcon />,
    isActive: true,
    items: [
      { title: "View Events", url: "/dashboard/events" },
      { title: "Manage Events", url: "/dashboard/events/manage" },
      { title: "My Tickets", url: "/dashboard/events/mytickets" },
    ],
  },
  {
    title: "Societies",
    url: "/dashboard/societies",
    icon: <UsersIcon />,
    items: [
      { title: "View Societies", url: "/dashboard/societies" },
    ],
  },
  {
    title: "Resources",
    url: "/dashboard/resources",
    icon: <PackageIcon />,
    items: [
      { title: "View Resources", url: "/dashboard/resources" },
      { title: "Request Resources", url: "/dashboard/resources/request" },
    ],
  },
  {
    title: "Venues",
    url: "/dashboard/venues",
    icon: <MapPinIcon />,
    items: [
      { title: "View Venues", url: "/dashboard/venues" },
      { title: "Book Venues", url: "/dashboard/venues/book" }
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings2Icon />,
    items: [
      { title: "General", url: "#" },
    ],
    
  },
  
];