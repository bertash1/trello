import supertest from "supertest"

import createServer from "../../utils/server"
import { createAuthHeader } from "../utils/createAuthHeader"

const app = createServer()

describe("Board", () => {
  test("should return all user boards", async () => {
    const accessToken = await createAuthHeader()

    if (accessToken) {
      await supertest(app)
        .get("/api/board/userBoards")
        .set("Authorization", accessToken)
        .then((res) => {
          expect(res.status).toBe(200)
          expect(res.body).toMatchSnapshot()
        })
    }
  })

  test("should handle request without access token and return a 401 status", async () => {
    const request = await supertest(app).get("/api/board/userBoards")

    expect(request.status).toBe(401)
  })
})
