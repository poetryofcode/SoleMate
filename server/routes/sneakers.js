import express from "express";
import {
  getAllSneakers,
  getSneakerById,
  createSneaker,
  updateSneaker,
  deleteSneaker,
} from "../controllers/sneakersController.js";

const router = express.Router();

// GET /api/sneakers - Get all sneakers
router.get("/", getAllSneakers);

// GET /api/sneakers/:id - Get single sneaker
router.get("/:id", getSneakerById);

// POST /api/sneakers - Create new sneaker
router.post("/", createSneaker);

// PUT /api/sneakers/:id - Update sneaker
router.put("/:id", updateSneaker);

// DELETE /api/sneakers/:id - Delete sneaker
router.delete("/:id", deleteSneaker);

export default router;
