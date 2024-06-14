// src/routes/sessionRouter.js
import express from "express";
const router = express.Router();

router.get("/set-cookie", (req, res) => {
  // 쿠키 생성 -> 클라이언트에 응답
  res.cookie("myCookie", "Hello, World!!!", { maxAge: 10000 });
  res.send(`Cookie created`);
});

router.get("/get-cookie", (req, res) => {
  res.send(`쿠키값 : ${req.cookies?.myCookie}`);
});

router.get("/delete-cookie", (req, res) => {
  res.clearCookie("myCookie");
  res.send("Cookie deleted");
});

export default router;

import express from 'express';
const router = express.Router();

// 세션 설정
router.get('/set-session', (req, res) => {
    req.session.username = 'JohnDoe';
    res.send('Session has been set');
});

// 세션 읽기
router.get('/get-session', (req, res) => {
    const username = req.session.username;
    res.send(`Session value: ${username}`);
});

// 세션 삭제
router.get('/destroy-session', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error destroying session');
        }
        res.send('Session destroyed');
    });
});

export default router;