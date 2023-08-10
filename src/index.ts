import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ... users routes ... //

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

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      res.status(404).json({ error: `User with ID ${id} not found` });
      return;
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while deleting the user with ID ${id}`,
    });
  }
});

// ... Note Routes ... //

app.post(`/notes`, async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the note" });
  }
});

app.get(`/notes`, async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching notes" });
  }
});

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!note) {
      res.status(404).json({ error: `Note with ID ${id} not found` });
      return;
    }
    res.json(note);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the note" });
  }
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while updating the note with ID ${id}`,
    });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while deleting the note with ID ${id}`,
    });
  }
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
