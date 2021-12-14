import { generateTokens } from "../../service/token"
import User from "../../models/User"

export const createAuthHeader = async () => {
  const user = await User.findOne()
  if (user) {
    const { email, isActivated, _id } = user
    const tokens = generateTokens({ email, isActivated, _id })
    return `bearer ${tokens.accessToken}`
  }
}
