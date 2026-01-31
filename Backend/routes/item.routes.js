import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createItem, getItems, getItem } from "../controllers/item.controller.js";

const router = Router();

// Routes
router.post("/", upload.single("image"), createItem);
router.get("/", getItems);
router.get("/:id", getItem);

export default router;