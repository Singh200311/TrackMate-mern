 const express = require('express');
 const app = express();
 const cors = require('cors');
 const morgan = require('morgan');
 const dotenv = require('dotenv');
 const colors = require('colors');
 const path = require("path");
const connectDb = require('./config/connectDb');
 //config dot env file
 dotenv.config();

//database call
connectDb();

 //middlewares
 app.use(cors());
app.use(morgan('dev'));
 app.use(express.json());
app.use("/api/v1/budget", require("./routes/budgetRoute"));

 //TEST ROUTE (Add this here)
app.get('/test', (req, res) => {
  res.send('Server is working');
});
console.log('Mounting /api/v1/users route...');

//user routes
app.use('/api/v1/users', require('./routes/userRoute'));

//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

 //port
 const PORT = 8080 || process.env.PORT;

 //listen server
 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
 });
