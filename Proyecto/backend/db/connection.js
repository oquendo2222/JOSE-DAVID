const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_DBIP || 'mongodb://localhost:27017/mydb';

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

module.exports = connectDB;