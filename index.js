import express from "express";
import dotenv from "dotenv";
import multer from 'multer'
import productRouter from './src/router/productRouter.js'
import './src/db/db.js'
const app = express();
const upload = multer({ dest: "uploads/" });

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3001;
// console.log(port, "pppppppppp");

app.use("/", productRouter);

app.listen(port, () =>
  console.log(`Server connected  http://localhost:${port}`)
);
