import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    console.log("Connected to MongoDB...")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export default connectDB