const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then(() => {
    console.log("database conect");
})
.catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect('mongodb+srv://jainpratham123:12345pratham@wanderlust.8vvxs.mongodb.net/?retryWrites=true&w=majority&appName=WANDERLUST');
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({
        ...obj,
        owner: "670a747fddba7459d798147b",
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
