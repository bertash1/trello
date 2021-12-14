import connectDB from "./utils/connectDB"
import createServer from "./utils/server"
import dotenv from "dotenv"

dotenv.config()

const app = createServer()

const PORT = process.env.PORT || 4001

app.listen(PORT, async () => {
  console.log("Server started on port", PORT)
  await connectDB()
})
