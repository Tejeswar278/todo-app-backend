const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { fetchUserById, fetchUserByEmail } = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "lkjaidfjo8493u943u734urju9fnhfnbb38u";

exports.getUsers = async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
};

exports.fetchUser = async () => {
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id), // assuming `id` is of type Int
		},
	});
}

exports.singInUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await fetchUserByEmail(email)
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign(
			{ email: user.email, id: user.id },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);
		res.setHeader("Authorization", `Bearer ${token}`);
		return res.status(200).json({ message: "User verification successful" });
	} catch (err) {
		console.error("Sign-in error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
}

exports.getUser = async (req, res) => {
	const { id:user_id } = req.user

	try {
		const user = await fetchUserById(user_id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};

exports.createUser = async (req, res) => {
	const { name, email, password, mobile, gender } = req.body;

	try {
		const existingUser = await fetchUserByEmail(email);
		if (existingUser) {
			return res.status(409).json({ error: "User already exists" }); // 409 Conflict
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				mobile,
				gender
			},
		});

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.setHeader("Authorization", `Bearer ${token}`);
		return res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error("User creation error:", error);
		res.status(400).json({ error: "Email must be unique or missing field" });
	}
};

exports.updateUser = async (req, res) => {
	const { email } = req.user;
	const user_data = req.body;
	try {
		const updated = await prisma.user.update({
			where: { email: email },
			data: user_data,
		});
		res.json(updated);
	} catch (error) {
		res.status(404).json({ error: "User not found" });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: { id: parseInt(id) },
		});
		res.json({ message: "User deleted" });
	} catch (error) {
		res.status(404).json({ error: "User not found" });
	}
};
