import { Router } from 'express';
import {animalController} from "../controllers";

const router = Router();

router.get('/', animalController.getAnimals)

router.patch('/state/:id', animalController.updatedSelectedState)

router.put('/update/position', animalController.updatePosition)

export default router;
