import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
