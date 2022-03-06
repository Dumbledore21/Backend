"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minting_1 = require("./minting");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const hostname = '127.0.0.1';
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: "GET, POST"
};
const app = (0, express_1.default)();
// body parser middleware setup
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)(corsOptions));
console.log("test");
(0, minting_1.mintNFT)("AVabPm3PB7JxaNND5UKJRXQh4XRY4Mwjkg2nGAEG3TGn", "TESTHII");
app.post("/post", (req, res) => {
    console.log("Connected to React");
    console.log(req.body);
    console.log(req.body.publickey);
    let result = (0, minting_1.mintNFT)(req.body.publickey, "TESTHII");
    res.json({ message: "POST WORKS AS WELL" });
});
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}!`);
});
