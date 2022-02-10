
import express from "express";
import router from "./routes/auth";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}));
app.use('/add', router);
app.listen(3002);