// src/routes/todosRouter.js
import express from "express";
import Todo from "../models/Todo.js";
import passport from "passport";

const router = express.Router();

// 특정 유저의 모든 Todo 가져오기
router.get("/", async (req, res) => {
  try {
    const userId = req.user._id; // 세션에 저장된 사용자 ID 가져오기
    console.log(req.user);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 세션에서 사용자 ID 가져오기
router.post("/", async (req, res) => {
  const userId = req.session.userId;
  console.log(req.user._id);

  if (!req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, description, dueDate } = req.body;

  try {
    const newTodo = new Todo({
      userId: req.user._id,
      title,
      description,
      dueDate,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, dueDate },
      { new: true } // 옵션: 업데이트 후의 새로운 문서 반환
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete (DELETE) Todo 항목 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
