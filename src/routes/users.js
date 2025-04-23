const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");  
const authenticate = require("../middlewares/user.middleware");

router.get("/", userController.getUsers);
router.get("/get-user-details",authenticate, userController.getUser);
router.post("/signin", userController.singInUser);
router.post("/", userController.createUser);
router.put("/",authenticate, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
