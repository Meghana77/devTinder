const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 70
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
      minLength: 10,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error(`${value} is not a valid email`);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      required: true
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid string`
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function (){
  const user = this;
  const jwtToken = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {expiresIn: '7d'});
  return jwtToken;
}

userSchema.methods.validatePassword = async function (password){
  const user = this;
  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword;
}

const User = mongoose.model("users", userSchema);

module.exports = User;
