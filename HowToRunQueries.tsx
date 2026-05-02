import { executeSQL } from '@/lib/db'
import { extractVenues } from './Queries/Venues'
export default async function VenuesPage() {
  let venues: Awaited<ReturnType<typeof extractVenues>> = []
  try {
    venues = await extractVenues()
  } catch (error) {
    console.error("Failed to fetch venues:", error)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Campus Venues</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue.venue_id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{venue.venue_name}</h2> 
            <p className="text-gray-600">Block: {venue.location_building}</p>
            <p className="text-gray-600">Capacity: {venue.capacity} seats</p>
          </div>
        ))}
      </div>
    </div>
  )
}