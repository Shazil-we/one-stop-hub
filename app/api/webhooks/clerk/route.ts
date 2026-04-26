import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { executeSQL } from '@/lib/db' 

export async function POST(req: Request) {
  // 1. Get the Webhook Secret from your .env
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // 2. Get the headers to verify the request actually came from Clerk
  const headerPayload = await headers()
  
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  // 3. Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // 4. Verify the payload using Svix
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', { status: 400 })
  }
  const eventType = evt.type

  if (eventType === 'user.created') {
    // ADDED 'username' to the destructured data
    const { id, email_addresses, first_name, last_name, username } = evt.data

    const email = email_addresses[0]?.email_address
    const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Campus User'
    
    // BULLETPROOF FALLBACK: If they didn't provide a username, grab the first half of their email
    const finalUsername = username || email?.split('@')[0] || `user_${id.substring(0, 5)}`

    // UPDATED QUERY: Added username column and $3 variable
    const syncSql = `
      INSERT INTO users (user_id, full_name, username, email, role) 
      VALUES ($1, $2, $3, $4, 'Student') 
      ON CONFLICT (user_id) DO NOTHING;
    `
    try {
      // UPDATED EXECUTION: Passed finalUsername as the 3rd variable
      await executeSQL(syncSql, [id, fullName, finalUsername, email])
      console.log(`Successfully synced user ${email} (Username: ${finalUsername}) to Neon!`)
    } catch (error) {
      console.error('Neon DB Sync Failed:', error)
      return new Response('Database Error', { status: 500 })
    }
  }

  return new Response('Webhook received and processed', { status: 200 })
}