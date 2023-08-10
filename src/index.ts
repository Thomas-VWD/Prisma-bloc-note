import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ... (Autres routes)

app.post(`/signup`, async (req, res) => {
  const { name, email, password } = req.body;

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json(result);
});

// ... (Autres routes)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
