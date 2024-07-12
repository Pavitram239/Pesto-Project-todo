import { config } from "dotenv";
config();
import mongoose from "mongoose";
import User from "./models/user.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const user = {
      name: "Pavitra Modi",
      email: "pavitram239@gmail.com",
      password: "secret1234",
      verified: true,
    };
    await User.create(user);
    console.log("");
  })
  .catch(() => {
    console.log("error");
  });
