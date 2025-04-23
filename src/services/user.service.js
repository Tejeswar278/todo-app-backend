const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 🧩 Reusable function
const fetchUserById = async (id) => {
	return await prisma.user.findUnique({
		where: {
			id: parseInt(id),
		},
	});
};

const fetchUserByEmail = async (email) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
};

module.exports = { fetchUserById, fetchUserByEmail };
