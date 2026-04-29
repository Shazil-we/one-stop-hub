import { extractResources } from "@/Queries/Resources";
import { fetchSocietyEvents } from "@/Queries/Events";
import { fetchManagedSocietyID } from "@/Queries/Societies";
import { extractUserFullInfo } from "@/Queries/Users";
import { AllocateResourceField } from "./AllocateResourceField";

export default async function AllocateResourceButton() {
    const user = await extractUserFullInfo();

    if (!user || user.role !== "SocietyHead") {
        return null;
    }

    const managedSociety = await fetchManagedSocietyID(user.user_id);
    if (!managedSociety) {
        return null;
    }

    const resources = await extractResources();
    const events = await fetchSocietyEvents(String(managedSociety.society_id));

    const eventOptions = events.map((event) => ({
        event_id: String(event.event_id),
        event_name: event.event_name,
    }));
    const resourceOptions = resources.map((resource) => ({
        resource_id: resource.resource_id,
        item_name: resource.item_name,
        total_inventory: resource.total_inventory,
    }));

    return (
        <div className="z-50">
            <AllocateResourceField events={eventOptions} resources={resourceOptions} />
        </div>
    );
}
