// utils/authentication.js
import { status } from "http-status";
import { User } from "../models/UserModel.js"; // note the `.js` extension required
import bcrypt from "bcrypt";
import crypto from "crypto";

// SIGNUP
export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
     console.log(email , username , password)
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(status.CONFLICT)
        .json({ message: "User already exists", success: false });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // generate token
    const token = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      token,
    });

    await newUser.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ⚠️ set `true` in production with HTTPS
    sameSite: "Lax",
      maxAge:60* 60 * 60 * 1000, // 1 hour
    });

    return res
      .status(status.CREATED)
      .json({ message: "Account created", success: true ,data:newUser});
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while signing up", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: "Invalid email", success: false });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, existUser.password);
    console.log(isMatch , "In is match");
    if (!isMatch) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: "Password is incorrect", success: false });
    }

    // generate new token
    const token = crypto.randomBytes(20).toString("hex");
    await User.updateOne({ email }, { $set: { token } });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ⚠️ set `true` in production with HTTPS
      sameSite: "Lax",
      maxAge:60* 60 * 60 * 1000,
    });

    return res
      .status(status.ACCEPTED)
      .json({ message: "Login successful", success: true,  data: existUser });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while logging in", error: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "None",
  });

    return res.status(status.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while logging out", error: error.message });
  }
};
