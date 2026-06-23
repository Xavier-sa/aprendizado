const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/router");
const path = require("path");
const cors = require("cors");
const app = express();

require("./src/controllers/produtoController");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.set("view engine", "ejs");
app.use(routes);

app.use("/css", express.static(path.resolve(__dirname, "views/css")));
app.use("/js", express.static(path.resolve(__dirname, "views/js")));

app.use("/", require("./src/routes/router"));

app.listen(PORT, () => {
  console.log(`Servidor Rodando em http://localhost:${PORT}`);
});
