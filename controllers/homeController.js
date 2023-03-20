const Contato = require("../models/contatoModel");
exports.home = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render("home", {contatos});
};
