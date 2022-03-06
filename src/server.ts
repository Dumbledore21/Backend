import { mintNFT } from './minting';
import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import http from "http";
import { monitorEventLoopDelay } from 'perf_hooks';
const hostname = '127.0.0.1';


var corsOptions = {
  origin: 'http://localhost:3000', // Specify webpage!
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST"
}

const app = express();

// body parser middleware setup
app.use(urlencoded({extended: false}));
app.use(json());

app.use(cors(corsOptions))
console.log("test")
mintNFT("AVabPm3PB7JxaNND5UKJRXQh4XRY4Mwjkg2nGAEG3TGn","TESTHII");

app.post("/post", (req, res) => {
  console.log("Connected to React");
  console.log(req.body);
  console.log(req.body.publickey)
  let result = mintNFT(req.body.publickey, "TESTHII");
  res.json({ message: "POST WORKS AS WELL" });
});


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}!`)
});