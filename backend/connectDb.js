import mongoose from 'mongoose';


export const connectDB = async () => {


  if (mongoose.connections[0].readyState) {
    console.log('Already connected to DB');
    return mongoose.connection;
  }
    //new connection
  try {
    const path = process.env.MONGODB_URI;
    console.log('Connecting to DB:', path);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    return mongoose.connection;
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to the database');
  }
};
