import express from 'express';
import { getMissingPeople, createMissingPerson, updateMissingPerson, deleteMissingPerson, getMissingPersonById, postMissingImage } from '../controllers/missingPeopleController.js';

export const router = express.Router();

router.get("/", getMissingPeople);
router.get("/:id", getMissingPersonById);
router.post("/", createMissingPerson);
router.patch("/:id", updateMissingPerson);
router.delete("/:id", deleteMissingPerson);
router.post("/saveMissingPerson", postMissingImage);
