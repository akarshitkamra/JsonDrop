import { randomUUID } from 'crypto'

// In-memory store (resets on server restart)
const blobs = global.blobs || (global.blobs = {})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.json) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'No JSON provided' }))
  }
  // Save JSON string keyed by UUID
  const id = randomUUID()
  blobs[id] = body.json
  return { id }
})
