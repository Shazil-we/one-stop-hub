import { executeSQL } from '@/lib/db'

export default async function VenuesPage() {
  const fetchVenuesSql = `
    SELECT venue_id, venue_name, capacity, location_block 
    FROM venues 
    ORDER BY venue_name ASC;
  `
  let venues = []
  try {
    const result = await executeSQL(fetchVenuesSql, [])
    venues = result.rows // The array of data objects
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
            <p className="text-gray-600">Block: {venue.location_block}</p>
            <p className="text-gray-600">Capacity: {venue.capacity} seats</p>
          </div>
        ))}
      </div>
    </div>
  )
}