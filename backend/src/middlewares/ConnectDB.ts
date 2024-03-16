import mongoose from "mongoose"

const mongo_uri = process.env.MONGO_URI as string

export const ConnectDB = () => {
  mongoose.connect(mongo_uri)
    .then(() => console.log("Successfully connected to MongoDB!"))
    .catch((err) => console.log(`Couldn't connect to MongoDB: ${err}`))
}
