const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
});

const Usuario = mongoose.model("Usuario", schema, "usuarios");

module.exports = Usuario;