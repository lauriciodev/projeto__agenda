const Contato = require("../models/contatoModel");

exports.index = (req,res) =>{
  res.render("contato",{
    contato:{}
  });
};
exports.register = async (req,res) =>{
 try{
  const contato = new Contato(req.body);
  await contato.register()
  if(contato.error.length > 0){
    req.flash("error", contato.error);
    req.session.save(() => res.redirect("/contato/index"));
    return;
  }

  req.flash("success","contato registrado com sucesso.");
  req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
  return;
 }catch(e){
  console.log(e);
  res.redirect("404");
  return;
 }
};


exports.editIndex = async function(req,res){
  if(!req.params.id) return res.render("404");
  const user = await Contato.buscaPorId(req.params.id);
  if(!user) return res.render("404");

  res.render("contato",{
    contato:user
  })
}