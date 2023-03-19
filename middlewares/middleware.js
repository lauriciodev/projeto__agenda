exports.middlewareGlobal = (req,res,next) =>{
  res.locals.user = req.session.user
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
}

exports.checkCsrf = (err,req,res,next) =>{
  if(err){
    return res.render("login");
  }
  next()
}


exports.csrfMiddleware = (req,res,next) =>{
  res.locals.csrfToken = req.csrfToken();
  next();
}


exports.loginRequired = (req,res,next) =>{
  if(!req.session.user){
    req.flash("error","você precisa fazer login");
    req.session.save(() => res.redirect("/"));
    return;
  }

  next();
}