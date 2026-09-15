import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { listEarnings } from "../controllers/earningsController.js";

const router = Router();

router.get("/", authenticate, listEarnings);

export default router;
