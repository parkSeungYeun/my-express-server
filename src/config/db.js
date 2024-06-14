import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// 비동기 처리를 위한 async 함수
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/my-express-server", {
      useNewUrlParser: true, // 올바른 옵션 이름
      useUnifiedTopology: true, // 추가 권장 옵션
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
