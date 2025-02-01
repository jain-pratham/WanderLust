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
  await mongoose.connect('mongodb+srv://jainpratham123:12345pratham@wanderlust.8vvxs.mongodb.net/?retryWrites=true&w=majority&appName=WANDERLUST');

}



app.listen(port,() => {
    console.log("connection done");
})
