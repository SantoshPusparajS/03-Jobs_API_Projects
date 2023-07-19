import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter name"],
    minlength: 4,
    malength: 100,
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please enter password "],
    minlength: 4,
    malength: 100,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Can also be used to create token from model
UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

UserSchema.methods.comparePassword = async function (givenPassword) {
  const isPasswordMatch = await bcrypt.compare(givenPassword, this.password);
  console.log(isPasswordMatch);
  return isPasswordMatch;
};

const User = mongoose.model("User", UserSchema);

export default User;
