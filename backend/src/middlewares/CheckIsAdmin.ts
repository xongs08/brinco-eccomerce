const admin_auth = process.env.ADMIN_AUTH

export const isAdmin = async (auth: string) => {
  if (auth === admin_auth) return true
  else return false
}
