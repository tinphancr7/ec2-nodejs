const express = require("express");
const router = express.Router();

const specialtyController = require("../controllers/specialtyController");

router.post("/new", specialtyController.createSpecialty);
router.put("/:id", specialtyController.updateSpecialty);
router.get("/", specialtyController.getAllSpecialty);
router.delete("/:id", specialtyController.deleteSpecialty);
router.get("/:id", specialtyController.getSpecialtyById);

module.exports = router;
