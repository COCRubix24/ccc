import express from "express";
const router = express.Router();
import { postData } from "../controllers/getExcelData.js";

router.post("/postData", postData);

export default router