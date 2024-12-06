const express = require("express");
const router = express.Router();
const OfertaLaboral = require("../models/ofertasLaborales");
const client = require("../config/redis"); // Redis client

// Cache key prefix for all job offers
const cacheKeyPrefix = "ofertasLaborales:";

// Create a new job offer (POST)
router.post("/ofertas-laborales", async (req, res) => {
  try {
    const oferta = new OfertaLaboral(req.body);
    const savedOferta = await oferta.save();

    // Invalidate cache for all job offers
    await client.del(cacheKeyPrefix + "all");

    res.status(201).json(savedOferta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all job offers (GET)
router.get("/ofertas-laborales", async (req, res) => {
  const cacheKey = cacheKeyPrefix + "all";

  try {
    // Check Redis for cached data
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for all job offers");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("Cache miss for all job offers");
    const ofertas = await OfertaLaboral.find();

    // Cache the result
    await client.set(cacheKey, JSON.stringify(ofertas), {
      EX: 3600, // Set expiration time to 1 hour
    });

    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single job offer by ID (GET)
router.get("/ofertas-laborales/:id", async (req, res) => {
  const cacheKey = cacheKeyPrefix + req.params.id;

  try {
    // Check Redis for cached data
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for job offer ID: ${req.params.id}`);
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log(`Cache miss for job offer ID: ${req.params.id}`);
    const oferta = await OfertaLaboral.findById(req.params.id);

    if (!oferta) {
      return res.status(404).json({ error: "Job offer not found" });
    }

    // Cache the result
    await client.set(cacheKey, JSON.stringify(oferta), {
      EX: 3600, // Set expiration time to 1 hour
    });

    res.status(200).json(oferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a job offer by ID (PUT)
router.put("/ofertas-laborales/:id", async (req, res) => {
  try {
    const updatedOferta = await OfertaLaboral.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOferta) {
      return res.status(404).json({ error: "Job offer not found" });
    }

    // Invalidate cache for this job offer and the all-job-offers cache
    await client.del(cacheKeyPrefix + req.params.id);
    await client.del(cacheKeyPrefix + "all");

    res.status(200).json(updatedOferta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job offer by ID (DELETE)
router.delete("/ofertas-laborales/:id", async (req, res) => {
  try {
    const deletedOferta = await OfertaLaboral.findByIdAndDelete(req.params.id);

    if (!deletedOferta) {
      return res.status(404).json({ error: "Job offer not found" });
    }

    // Invalidate cache for this job offer and the all-job-offers cache
    await client.del(cacheKeyPrefix + req.params.id);
    await client.del(cacheKeyPrefix + "all");

    res.status(200).json({ message: "Job offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
