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
  req.session.save(() => res.redirect("/"));
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

exports.edit = async function(req,res){
 try{
  if(!req.params.id) return res.render("404");
  const contato = new Contato(req.body);
  await contato.edit(req.params.id);

  if(contato.error.length > 0){
    req.flash("error",contato.error);
    req.session.save(() => res.redirect(`/contato/index/${req.params.id}`));
    return;
  }

  req.flash("success","contato atualizado com sucesso.");
  req.session.save(() => res.redirect("/"));
  return;  
 }catch(e){
  res.render("404");
  console.log(e)
 }


}

exports.delete = async function(req,res){
  if(!req.params.id) return res.render("404");
  const user = await Contato.delete(req.params.id);
  if(!user) return res.render("404");

  req.flash("success","contato deletado com sucesso.");
  req.session.save(() => res.redirect("/"));
  return
}