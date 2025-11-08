const Produto = require("../models/produto");

exports.lista = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Produto.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Produto não encontrado com id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro ao recuperar usuário com id " + id });
      });
  } else {
    Produto.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Ocorreu um erro ao recuperar as informações do produto",
        });
      });
  }
};

exports.cadastrar = async (req, res) => {
  const { codigo, descricao, preco, quantidade } = req.body;

  try {
    if (await Produto.findOne({ codigo }))
      return res.status(400).send({ error: "Produto já cadastrado" });

    const produto = await Produto.create({
      codigo,
      descricao,
      preco,
      quantidade,
    });

    return res.send({ produto });
  } catch (error) {
    return res.status(400).send({ error: "Erro ao cadastrar o produto" });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  Produto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível atualizar o produto com ${id}. Talvez usuário não encontrado`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Erro Atualizar informações do produto" });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  await Produto.findByIdAndRemove({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível excluir com id ${id}. Talvez o ID esteja errado`,
        });
      } else {
        res.send({
          message: "O produto foi excluído com sucesso!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível excluir o produto com id=" + id,
      });
    });
};
