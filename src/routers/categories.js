import express from "express";
import { CategoryController } from "../controllers/index.js";
import { checkPermission } from "../middlewares/checkPermissition.js";

const router = express.Router();

router.get('/', CategoryController.getAll);

router.get('/:id', CategoryController.getOne)

router.post('/add', checkPermission, CategoryController.addCate)

router.put('/update/:id', checkPermission, CategoryController.updateCate)

router.delete('/delete/:id', checkPermission, CategoryController.deleteCate)

export default router