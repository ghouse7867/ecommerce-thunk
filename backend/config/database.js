const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({
  path: './config/config.env'
});

const connectDatabase = async () => {
  try {
    const DB = process.env.DATABASE;
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the application if the database connection fails.
  }
};



module.exports = connectDatabase;
