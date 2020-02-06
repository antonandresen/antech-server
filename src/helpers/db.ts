import mongoose, { Mongoose} from 'mongoose';

const connectDB = async () => {
    const conn: Mongoose = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

export = connectDB;