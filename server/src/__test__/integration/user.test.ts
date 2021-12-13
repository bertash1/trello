/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import createServer from "../../utils/server"
import * as userService from "../../service/user"
import User from "../../models/User"

import bcrypt from "bcrypt"

const app = createServer()

describe("User", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: "trello" })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  const userId = new mongoose.Types.ObjectId().toString()

  const userPayload = {
    email: "some@test.com",
    password: "12345",
  }

  const userPayloadWithoutPassword = {
    email: "test1@mail.com",
  }

  const userData = {
    email: "some@test.com",
    isActivated: false,
    _id: userId,
  }

  const fakeUserResponse = {
    accessToken: expect.any(Object),
    refreshToken: expect.any(Object),
    user: {
      _id: expect.any(Object),
      email: userData.email,
      isActivated: userData.isActivated,
    },
  }

  describe("User registration", () => {
    test("should return a 200 status and user data", async () => {
      jest
        .spyOn(userService, "userRegistration")
        //@ts-ignore
        .mockReturnValueOnce(fakeUserResponse)

      const response = await supertest(app)
        .post("/api/registration")
        .send(userPayload)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(fakeUserResponse)
    })

    test("should handle missing required params and return a 400 status", async () => {
      const response = await supertest(app)
        .post("/api/registration")
        .send({ userPayloadWithoutPassword })

      expect(response.status).toBe(400)
    })

    test("should handle not valid email and return a 400 status", async () => {
      const response = await supertest(app)
        .post("/api/registration")
        .send({ email: "notvalidemail", password: "12345" })

      expect(response.status).toBe(400)
    })

    test("should handle not valid password and return a 400 status", async () => {
      const response = await supertest(app)
        .post("/api/registration")
        .send({ email: "validemail@gmail.com", password: "1" })

      expect(response.status).toBe(400)
    })
  })
  describe("User login", () => {
    test("should return a 200 status and user data", async () => {
      const password = await bcrypt.hash("12345", 3)
      const user = new User({ email: "email@test.com", password })
      await user.save()

      const response = await supertest(app)
        .post("/api/login")
        .send({ email: "email@test.com", password: "12345" })

      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
    })

    test("should handle incorrect password and return a 404 status", async () => {
      const password = await bcrypt.hash("12345", 3)
      const user = new User({ email: "email@test.com", password })
      await user.save()

      const response = await supertest(app)
        .post("/api/login")
        .send({ email: "email@test.com", password: "Incorrect password" })

      expect(response.status).toBe(404)
    })

    test("should handle incorrect email and return a 404 status", async () => {
      const password = await bcrypt.hash("12345", 3)
      const user = new User({ email: "email@test.com", password })
      await user.save()

      const response = await supertest(app)
        .post("/api/login")
        .send({ email: "incorrect email", password })

      expect(response.status).toBe(404)
    })
  })
})
