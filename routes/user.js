const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);

module.exports = router;
