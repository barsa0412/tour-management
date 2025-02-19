import express from "express";
import { createTour, deleteTour, getAllTour, getSingleTour, updateTour } from "../controllers/tourController.js";

const router = express.Router();

// create new tour 
router.post("/", createTour);

// update tour 
router.put("/:id", updateTour);

// create new tour 
router.delete("/:id", deleteTour);

// create new tour 
router.get("/:id", getSingleTour);

// create new tour 
router.get("/", getAllTour);


export default router;