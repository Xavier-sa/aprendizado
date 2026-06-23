const mongoose = require("../database");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  senha: {
    type: String,
    required: true,
  },

  tipo: {
    type: String,
    enum: ['adm', 'caixa'],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
