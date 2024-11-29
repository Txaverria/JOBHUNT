const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const OfertaLaboral = mongoose.model("OfertaLaboral", schema, "ofertasLaborales");

module.exports = OfertaLaboral;
