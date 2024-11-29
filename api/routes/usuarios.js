const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");

// Create a new user (POST)
router.post("/usuarios", async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const savedUsuario = await usuario.save();
    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users (GET)
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID (GET)
router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID (PUT)
router.put("/usuarios/:id", async (req, res) => {
  try {
    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUsuario) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID (DELETE)
router.delete("/usuarios/:id", async (req, res) => {
  try {
    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!deletedUsuario) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
