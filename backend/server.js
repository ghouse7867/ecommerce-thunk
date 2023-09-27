const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv').config(
    {
    path: './config/config.env'
   }
);

connectDatabase();

const PORT = process.env.PORT;

const ENV = process.env.NODE_ENV; 


app.listen(PORT, ()=>{
    console.log(`server started on PORT:${PORT} in ${ENV} mode.`)
});