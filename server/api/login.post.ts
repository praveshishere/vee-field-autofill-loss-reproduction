export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (password !== 'password') {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  return { user: { email } }
})
