// models/Todo.js

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now, // 필요에 따라 기본 값 설정
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
