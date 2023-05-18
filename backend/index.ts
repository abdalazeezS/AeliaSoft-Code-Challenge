import express from "express";
import cors from "cors";
import { userRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);


app.listen(3010, () => { console.log("Server running on port: 3010") });