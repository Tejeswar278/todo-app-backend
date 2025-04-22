const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { fetchUserById } = require("../services/user.service");

exports.getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

exports.createTodo = async (req, res) => {
    const { user_id, todo, description } = req.body;
  
    try {
      const user = await fetchUserById(user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const newTodo = await prisma.todo.create({
        data: { user_id, todo, description },
      });
  
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(400).json({ error: "Todo must be unique or missing field" });
    }
  };

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const user_data = req.body;
  const {user_id} = user_data
  try {
    const user = await fetchUserById(user_id);
      
    if (!user) {
    return res.status(404).json({ error: "User not found" });
    }
    const updated = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: user_data,
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
};
