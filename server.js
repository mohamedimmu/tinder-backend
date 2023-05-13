import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import Cards from "./dbCards.js";
import * as dotenv from 'dotenv' 

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 8001;
const uri =
  `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.amwjbty.mongodb.net/?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(cors());


// DB Config
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// API Endpoints
app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello World!!");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(err => {
      console.error('Error creating document:', err);
      res.status(500).send(err);
    })
});

app.get("/tinder/cards", (req, res) => {
  Cards.find()
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

// Listener
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
