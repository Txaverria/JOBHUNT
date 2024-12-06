const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");
const client = require("../config/redis"); // Redis client

// Cache key prefix for all users
const cacheKeyPrefix = "usuarios:";

// Create a new user (POST)
router.post("/usuarios", async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const savedUsuario = await usuario.save();

    // Invalidate cache for all users
    await client.del(cacheKeyPrefix + "all");

    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users (GET)
router.get("/usuarios", async (req, res) => {
  const cacheKey = cacheKeyPrefix + "all";

  try {
    // Check Redis for cached data
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for all users");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("Cache miss for all users");
    const usuarios = await Usuario.find();

    // Cache the result
    await client.set(cacheKey, JSON.stringify(usuarios), {
      EX: 3600, // Set expiration time to 1 hour
    });

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID (GET)
router.get("/usuarios/:id", async (req, res) => {
  const cacheKey = cacheKeyPrefix + req.params.id;

  try {
    // Check Redis for cached data
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for user ID: ${req.params.id}`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log(`Cache miss for user ID: ${req.params.id}`);
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cache the result
    await client.set(cacheKey, JSON.stringify(usuario), {
      EX: 3600, // Set expiration time to 1 hour
    });

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
    });

    if (!updatedUsuario) {
      return res.status(404).json({ error: "User not found" });
    }

    // Invalidate cache for this user and the all-users cache
    await client.del(cacheKeyPrefix + req.params.id);
    await client.del(cacheKeyPrefix + "all");

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

    // Invalidate cache for this user and the all-users cache
    await client.del(cacheKeyPrefix + req.params.id);
    await client.del(cacheKeyPrefix + "all");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;