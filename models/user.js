import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    verified: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  const isValid = await compare(password, this.password);
  return isValid;
};

export default mongoose.model("User", userSchema);
