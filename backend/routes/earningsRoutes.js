import { Router } from "express";
import { listEarnings } from "../controllers/earningsController.js";

const router = Router();

router.get("/", listEarnings);

export default router;
