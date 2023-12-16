const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
router.get("/hot", productController.getAllHotProducts);
router.get("/:id", productController.getProductById);
router.post("/new", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.get("/", productController.getAllProducts);

router.get("/category/:id", productController.getProductsByCategoryId);

module.exports = router;
