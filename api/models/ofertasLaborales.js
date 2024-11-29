const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
});

const OfertaLaboral = mongoose.model("OfertaLaboral", schema, "ofertasLaborales");

module.exports = OfertaLaboral;
