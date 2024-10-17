const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

main()
.then((res) => {
    console.log("database are created");
})
.catch((err) => {
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');

}



app.listen(port,() => {
    console.log("connection done");
})
