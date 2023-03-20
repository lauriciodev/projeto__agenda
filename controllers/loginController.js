const Login = require("../models/loginModel");

exports.index = (req,res) =>{
  if(req.session.user) return res.render("logged");
  return res.render("login");
}

//create a new user

exports.register = async (req,res) =>{
  try{
    const login = new Login(req.body);
    await login.register();
    if(login.error.length > 0){
      req.flash('error',login.error)
      req.session.save(function(){
       return res.redirect("/login/index")
      });
      return;
    }

    req.flash('success',"usuario criado com sucesso.")
    req.session.save(function(){
     return res.redirect("/login/index")
    });
  }catch(e){
    console.log(e)
   return res.render("404");
  }

};

//login user
exports.login = async (req,res) =>{
  try{
    const login = new Login(req.body);
    await login.login();
    if(login.error.length > 0){
      req.flash('error',login.error)
      req.session.save(function(){
       return res.redirect("/login/index")
      });
      return;
    }

    req.flash('success',"usuario logado sucesso.");
    req.session.user = login.user;
    req.session.save(function(){
     return res.redirect("/")
    });
  }catch(e){
    console.log(e)
   return res.render("404");
  }

};


exports.logout = (req,res) =>{
  req.session.destroy();
  res.redirect("/")
}