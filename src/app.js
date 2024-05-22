import express, { urlencoded } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded());



export default app;