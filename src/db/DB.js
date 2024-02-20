import mongoose from "mongoose";

const dbConnection = async () => {
  const uri = process.env.DB_URI;
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default dbConnection;
