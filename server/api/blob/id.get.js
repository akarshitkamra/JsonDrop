const blobs = global.blobs || {}

export default defineEventHandler((event) => {
  const { id } = event.context.params
  if (!blobs[id]) {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Blob not found' }))
  }
  return { json: blobs[id] }
})
