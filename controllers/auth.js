import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    //const token = user.createJWT(); //Will call the function in model
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        message: `Successfully Created ${user.name} with email id ${user.email}`,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please enter both username and password!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.. Please signup and try again !");
  }

  const passwordCheck = await user.comparePassword(password);

  if (!passwordCheck) {
    res.status(400).json({
      status: "error",
    });
  } else {
    const token = user.createJWT();

    res.status(200).json({
      status: "success",
      data: {
        message: `${user.name} logged in successfully!`,
        token,
      },
    });
  }
};

export { signup, login };
