const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = (process.env.MONGO_DBIP || 'mongodb://localhost:27017/mydb').trim();

  if (!/^mongodb(\+srv)?:\/\//i.test(uri)) {
    throw new Error('MONGO_DBIP invalida: debe iniciar con mongodb:// o mongodb+srv://');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

module.exports = connectDB;