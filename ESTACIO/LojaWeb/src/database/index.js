const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Lojaweb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => {
    console.log("Conectado ao MongoDB!Funcionando!xavierdeveloper");
  })
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
