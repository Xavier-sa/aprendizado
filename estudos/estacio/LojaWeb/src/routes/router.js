const express = require("express");
const route = express.Router();

const controller = require("../controllers/produtoController");
const services = require("../service/render");

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/", services.homeRoutes);
route.get("/novo_produto", services.novo_produto);
route.get("/atualizar_produto", services.atualizar_produto);

/**
 *  @description API Route
 */
route.post("/api/produtos", controller.cadastrar);
route.get("/api/produtos", controller.lista);
route.put("/api/produtos/:id", controller.update);
route.delete("/api/produtos/:id", controller.delete);

module.exports = route;
