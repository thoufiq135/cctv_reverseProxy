const express = require("express");
const cors = require("cors");
const stream=require("./stream")

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/",(req,res)=>{
res.send("<h1>server is running</h1>")
})
app.use("/api",stream)
app.listen(3000, () => {
    console.log("Server Running");
});
