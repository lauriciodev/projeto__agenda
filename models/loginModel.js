const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const LoginSchema = new mongoose.Schema({
email:{type:String,required:true},
password:{type:String,required:true}
});

const LoginModel = mongoose.model("login",LoginSchema);

class Login {
  constructor(body){
    this.body = body;
    this.error = [];
    this.user = null;
  }


  async login(){
    //log user
    this.validator();
    if(this.error.length > 0)return;
    this.user = await LoginModel.findOne({email:this.body.email});
    if(!this.user){
      this.error.push("usuario não existe");
      return;
    }
    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.error.push("senha inválida");
      this.user = null;
      return;
    }
  }


  async register(){
    this.validator();
    if(this.error.length > 0)return;

    await this.userExists()

    if(this.error.length > 0)return;

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = LoginModel.create(this.body);
   
  }
  async userExists(){
    const user = await LoginModel.findOne({email:this.body.email});
    if(user) this.error.push("Usuario já existe");
  } 


  validator(){
    this.cleanUp();
   //validation
   //email needs be valid
   if(!validator.isEmail(this.body.email)) this.error.push("Email inválido");
   //pass needs be valid
   if(this.body.password.length < 5 || this.body.password.length > 20){
    this.error.push("A senha precisa ter entre 5 e 20 caracteres")
   }


  }

  cleanUp(){
  for(const key in this.body){
   if(typeof this.body[key] !== "string"){
    this.body[key] = "";
   } 
  }
   this.body = {
    email:this.body.email,
    password:this.body.password,
   }
 }

}


module.exports = Login;