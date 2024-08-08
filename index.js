const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port =process.env.PORT ||  4000;

app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const uri =
  "mongodb+srv://mirasavsaniitsolution:admin@cluster0.fcbx8bk.mongodb.net/discord?retryWrites=true&w=majority&appName=Cluster0";
// this uri connection string get from driver
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
  name:String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("manies", userSchema);

app.get("/", (req, res) => {
  res.send("Api is working...");
});

// Define a route to get all users
app.get("/data", async (req, res) => {
  const users = await User.find();
  res.json(users);
  console.log(users);
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  if(req.body.password && req.body.email){
    let user = await  User.findOne(req.body);
    if (user) {
      res.send(user);
    } else {
      res.send("No user Found");
    }
  
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
