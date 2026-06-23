const mongoose = require("../database");

const ProdutoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
  },

  descricao: {
    type: String,
    require: true,
  },

  preco: {
    type: Number,
    require: true,
  },

  quantidade: {
    type: Number,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto;