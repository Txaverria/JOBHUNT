const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const Usuario = mongoose.model("Usuario", schema, "usuarios");

module.exports = Usuario;
