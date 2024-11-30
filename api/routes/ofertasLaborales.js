const express = require("express");
const router = express.Router();
const OfertaLaboral = require("../models/ofertasLaborales");

// Create a new job offer (POST)
router.post("/ofertas-laborales", async (req, res) => {
  try {
    const oferta = new OfertaLaboral(req.body);
    const savedOferta = await oferta.save();
    res.status(201).json(savedOferta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all job offers (GET)
router.get("/ofertas-laborales", async (req, res) => {
  try {
    const ofertas = await OfertaLaboral.find();
    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single job offer by ID (GET)
router.get("/ofertas-laborales/:id", async (req, res) => {
  try {
    const oferta = await OfertaLaboral.findById(req.params.id);
    if (!oferta) {
      return res.status(404).json({ error: "Job offer not found" });
    }
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
    res.status(200).json({ message: "Job offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;