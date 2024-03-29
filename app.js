const express=require('express');
require("dotenv").config();
require("express-async-errors");
const bodyParser = require('body-parser')

const app=express();

const connectDB=require('./db/connect')

//routers
const authRouter=require('./routes/authRoute')
const jobRouter=require('./routes/jobRoutes')
const userRouter=require('./routes/userRoute')
const leaderboardRoute=require('./routes/leaderboard')

const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use(express.json());
app.use(bodyParser.json())

app.use("/api/v1/auth",authRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/leaderboard',leaderboardRoute)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


