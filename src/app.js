const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/userModel");
const app = express();
const {
  validateSignUpRequest,
  validateLoginRequest,
  validateProfileReq,
} = require("./utils/validator");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authUser } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpRequest(req.body);
    const userObj = new User(req.body);
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    userObj.password = passwordHash;
    await userObj.save();
    res.status(201).send("User created successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message || "User creation failed");
  }
});

app.post("/login", async (req, res) => {
  validateLoginRequest(req.body);
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      res.status(400).send("Please enter a valid email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("You are not a valid user");
    } else {
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        res.status(403).send("Not a valid password");
      }
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Valid user");
    }
  } catch (e) {
    res.status(500).send(e.message || "Internal server error");
  }
});

app.post("/profile", authUser, async (req, res) => {
  try {
    validateProfileReq(req.body);
    res.send(req.user || "no response");
  } catch (e) {
    res.send(e.message || "Something went wrong");
  }
});

app.post("/sendConnectionRequest", authUser, () => {
  try {
    res.send("success");
  } catch (e) {
    res.send("failure");
  }
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("listening to port 3000");
    });
  })
  .catch((e) => {
    console.log("MongoDB connection failed");
  });
