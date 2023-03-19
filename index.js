const express = require("express");
const app = express();
const ejs = require("ejs");
const router = require("./routes/routes");
const {checkCsrf, csrfMiddleware, middlewareGlobal} = require("./middlewares/middleware")
const mongoose = require("mongoose");
const helmet = require("helmet");
const csrf = require("csurf");
//sessoes
const session = require("express-session");
const flash = require("connect-flash");
const  MongoDBStorage = require("connect-mongodb-session")(session)
const { emit } = require('./routes/routes');

//setting ejs and url encoded
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



//mongodb connection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/agenda", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
  app.emit("connected")
})
.catch(erro =>{
  console.log(erro);
})

//storage session
var store = new MongoDBStorage({
  uri:"mongodb://localhost:27017/agenda",
  collection:"sessions"
})

//catch error storage
store.on("error", function (error){
  console.log(error);
});


app.use(
  require("express-session")({
    secret:"minhasenha22",
    cookie:{
      maxAge: 60000 * 60  
    },
    store:store,
    resave:true,
    saveUninitialized:true,
  })
);

app.use(flash());

//helmet seccure
app.use(helmet());
app.use(csrf());


//middlewares 
app.use(checkCsrf);
app.use(csrfMiddleware);
app.use(middlewareGlobal);

//routes
app.use(router);


app.on("connected", () =>{
  app.listen(3000, (erro) => {
    if (erro) {
      console.log("erro ao iniciar servidor");
    } else {
      console.log("servidor iniciado com sucesso");
    }
  });
})


