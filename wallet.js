const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const mongodb = require("mongodb");

const client = new mongodb.MongoClient(process.env.DBURL);






//create a server
const server = express();

server.use(cors());
server.use(express.json());

//Routes

//Creates address
server.post("/create-btc-address", async function(request, response){
    const feedback = await axios.post("https://api.blockcypher.com/v1/btc/test3/addrs");

    if(feedback){
        console.log(feedback)
        await client.db(process.env.DBNAME).collection("btc-addresses").insertOne({
            data: feedback.data
        });
        
        response.send({
            message: "A new btc has been generated",
            data: feedback.data
        })
    }

})

//create a wallet
server.post("/create-wallet", function(request, response){

});

server.post("/transfer-btc", function(request, response){

});

server.post("/transfer-eth", function(request, response){

});

server.get("/check-btn-balance", function(request, response){

})



server.listen(process.env.PORT || 3000, () => console.log(`Server is listening `))
