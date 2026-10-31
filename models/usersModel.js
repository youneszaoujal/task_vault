import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Du måste ange ett användare"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Du måste ange en e-post adress"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Du måste ange ett lösenord"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model("User", userSchema);
