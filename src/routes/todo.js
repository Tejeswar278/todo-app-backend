const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const authenticate = require("../middlewares/user.middleware");

router.get("/",authenticate, todoController.getTodos);
router.post("/",authenticate, todoController.createTodo);
router.put("/:id",authenticate, todoController.updateTodo);
router.delete("/:id",authenticate, todoController.deleteTodo);

module.exports = router;
