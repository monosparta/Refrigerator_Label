import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js"; // router接口
import "dotenv/config";// require('dotenv').config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static(path.__dirname + '/public'));

//router
server.use('/', router);

//port
const PORT = process.env.PORT||3000;

server.listen(PORT, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`Server is running on port ${PORT}.`);
});
