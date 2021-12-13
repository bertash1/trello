process.env.JWT_ACCESS_SECRET = "jwt-secret-key"
process.env.JWT_REFRESH_SECRET = "jwt-refresh-secret-key"
import mongoose from "mongoose"

import { MongoMemoryServer } from "mongodb-memory-server"
import User from "./src/models/User"
import bcrypt from "bcrypt"

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { dbName: "trello" })
})

beforeEach(async () => {
  const password = await bcrypt.hash("12345", 3)
  const user = new User({
    email: "email@test.com",
    password,
    isActivated: false,
    activationLink: "someLink",
  })
  await user.save()
})

afterEach(async () => {
  User.collection.drop()
})
