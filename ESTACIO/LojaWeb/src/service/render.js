const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:3000/api/produtos")
    .then(function (response) {
      res.render("index", { produtos: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.novo_produto = (req, res) => {
  res.render("novo_produto");
};

exports.atualizar_produto = (req, res) => {
  axios
    .get("http://localhost:3000/api/produtos", { params: { id: req.query.id } })
    .then(function (response) {
      res.render("atualizar_produto", { produto: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};