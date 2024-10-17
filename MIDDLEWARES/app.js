const express = require("express");
const app = express();
const port = 8080;
const ExpressError = require("./expressError");




// app.use((req,res,next) => {
//     next();
//     console.log("------error-------");
// })
app.use("/list",(req,res,next) => {
    // req.time = new Date(Date.now()).toString;
    // console.log(req.method, req.path, req.time);
    console.log("hello");
    next();
})

const checktoken = (req,res,next) =>{
    const {token} =req.query;
    if(token == "pratham"){
        next();
    }else{
        throw new ExpressError(401,"access denied");
    }
}

app.get("/api", checktoken ,(req,res)=>{
    res.send("data");
})

app.get("/err", (req,res) =>{
    abcd =abcd
})

app.get("/",(req,res) => {
    res.send("bay");
})

app.post("/list",(req,res) => {
    res.send("bays");
})

app.use((err,req,res,next) => {
    // console.log("--------err---------");
    let {status = 500,message} = err;
    res.status(status).send(message);
    res.send(err);
})
// app.use((req,res)=>{
//     res.status(404).send("page not found");
// })
app.listen(8080, ()=>{
    console.log("conection done");
})