const mongoose = require("mongoose");
const validator = require("validator");
const contatoSchema = new mongoose.Schema({
nome:{type:String,required:true},
sobrenome:{type:String,required:false,default:""},
email:{type:String,required:false,default:""},
telefone:{type:String,required:false,default:""},
criado_em:{type:Date,default:Date.now},
});

const contatoModel = mongoose.model("contato",contatoSchema);

function Contato(body){
  this.body = body;
  this.error = [];
  this.contato = null;

}


Contato.prototype.register = async function(){
this.validator();
if(this.error.length > 0) return;
this.contato = await contatoModel.create(this.body)
}

Contato.prototype.validator = function(){
  this.cleanUp();
 //validation
 //email needs be valid
 if(this.body.email && !validator.isEmail(this.body.email)) this.error.push("Email inválido");
 if(!this.body.nome) this.error.push("nome é um campo obrigatório.");
 if(!this.body.email && !this.body.telefone){
  this.error.push("pelo menos um contato precisa ser enviado: email ou telefone.");
 }
}

Contato.prototype.cleanUp = function(){
  //converte para string;
for(const key in this.body){
 if(typeof this.body[key] !== "string"){
  this.body[key] = "";
 } 
}
 this.body = {
  nome:this.body.nome,
  sobrenome:this.body.sobrenome,
  email:this.body.email,
  telefone:this.body.telefone,
 }
}


Contato.prototype.edit = async function(id){
  if(typeof id !== "string") return;
  this.validator();
  if(this.error.length > 0)return;
 this.contato = await contatoModel.findByIdAndUpdate(id,this.body,{new:true});
}

Contato.buscaPorId = async function(id){
  if(typeof id !== 'string') return;
  const contatos = await contatoModel.findById(id);
  return contatos;
}

Contato.buscaContatos = async function(){
  const contatos = await contatoModel.find().sort({criado_em:-1})
  return contatos;
}
Contato.delete = async function(id){
  if(typeof id !== 'string') return;
  const contato = await contatoModel.findOneAndDelete({_id:id})
  return contato;
}

module.exports = Contato;