import express from 'express';
const app = express();
import ErrorHandler from './error/ErrorHandler.js';
import router from './modules/routes/appRoutes.js';

// global middleware in here
app.use(express.json());


//Routes 
app.get('/',(req,res)=>{
    res.send('Welcom to the TASK ')
})

// add all the routs in here or routers▼
app.use('/task', router);
// app.use('/task', here import all of your routes )

app.use(ErrorHandler);

export default app;
