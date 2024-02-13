import express from "express";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  uploadExcel,
} from "../controller/productController.js";
import { handleXlsxUpload } from "../middleware/multer.js";

const router = express.Router();



router.get("/products", getAllProducts);
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.patch("/products/:id", updateProduct);
router.post("/products/upload", handleXlsxUpload, uploadExcel);



export default router;
