require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true,
	exposedHeaders: ['Authorization'],
}));

app.use(express.json());

// Import user routes
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todo");

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
