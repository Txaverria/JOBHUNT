const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

  // titulo: { type: String },
  // descripcion: { type: String },
  // salario: { type: Number },
  // ubicacion: { type: String },
  // tipo: {
  //   type: String,
  //   enum: ["tiempo completo", "medio tiempo"],
  // },
  // modalidad: {
  //   type: String,
  //   enum: ["híbrido", "presencial"],
  // },
  // fechaPublicacion: { type: Date, default: Date.now },
  // fechaExpiracion: { type: Date },
  // solicitantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],

const OfertaLaboral = mongoose.model("OfertaLaboral", schema, "ofertasLaborales");

module.exports = OfertaLaboral;
