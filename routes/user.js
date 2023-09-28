const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/delete/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);
router.get("/search/:key", userController.searchUser);

module.exports = router;
