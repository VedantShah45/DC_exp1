import GradeCardModel from "../models/gradeCard.model.ts";
import UserModel from "../models/user.model.ts";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getRandomMarks = () => Math.floor(Math.random() * 51) + 50;

export const signupController = async (req:any, res:any) => {
  try {
    const { fullname, email, password } = req.body;

    let existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new UserModel({ name:fullname, email, password:hashedPassword });
    await user.save();

    const gradeCard = new GradeCardModel({
      user: user._id,
      corporateFinance: getRandomMarks(),
      investmentAnalysis: getRandomMarks(),
      financialAccounting: getRandomMarks(),
      riskManagement: getRandomMarks(),
      internationalFinance: getRandomMarks()
    });
    await gradeCard.save();

    user.gradeCard = gradeCard._id as mongoose.Types.ObjectId;

    user = await user.populate("gradeCard");

    await user.save();

    return res.status(201).json({ message: "User signed up successfully", user });
  } catch (error) {
    console.log(error);    
    return res.status(500).json({ message: "Internal Server Error"});
  }
};

export const loginController = async (req:any, res:any) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await UserModel.findOne({ email }).populate("gradeCard");
      if (!user) return res.status(400).json({ error: "Invalid email or password" });
  
      // Compare hashed password
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
  
      // Generate JWT token
      const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "SECRET", { expiresIn: "1h" });
  
      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.log(error);    
      return res.status(500).json({ message: "Internal Server Error"});
    }
  };
  

  