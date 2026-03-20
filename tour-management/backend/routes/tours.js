import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// search routes FIRST
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

// normal CRUD after search
router.get("/", getAllTour);
router.get("/:id", getSingleTour);

router.post("/", verifyAdmin, createTour);
router.put("/:id", verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);

export default router;