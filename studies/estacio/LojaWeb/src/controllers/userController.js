const Usuario = require("../models/usuario");

// Listar usuários ou usuário por ID
exports.lista = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Usuario.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Usuário não encontrado com id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro ao recuperar usuário com id " + id });
      });
  } else {
    Usuario.find()
      .then((usuarios) => {
        res.send(usuarios);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Erro ao recuperar os usuários.",
        });
      });
  }
};

// Cadastrar novo usuário (sem hash)
exports.cadastrar = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    if (await Usuario.findOne({ email }))
      return res.status(400).send({ error: "Usuário já cadastrado com este e-mail" });

    const usuario = await Usuario.create({
      nome,
      email,
      senha,  // senha salva direto (não recomendado fora de testes)
      tipo,
    });

    return res.status(201).send({ usuario });
  } catch (error) {
    return res.status(400).send({ error: "Erro ao cadastrar o usuário" });
  }
};

// Atualizar usuário
exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível atualizar o usuário com id ${id}.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Erro ao atualizar usuário." });
    });
};

// Deletar usuário
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Usuario.findByIdAndRemove({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Usuário não encontrado com id ${id}.`,
        });
      } else {
        res.send({ message: "Usuário excluído com sucesso!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível excluir o usuário com id=" + id,
      });
    });
};
