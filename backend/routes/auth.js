import express from "express";
import { login, register, userVerification, logout,addExcel } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/addExcel", addExcel);

router.get("/user", userVerification);
router.get("/logout", logout);


export default router