//when we have multiple router under one title, then we use express router
let express = require("express");
let app = express();
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 6700;

let menu = [
  { name: "Category", link: "/category" },
  { name: "Products", link: "/products" },
];

let categoryRouter = require("./src/controller/categoryRouter")(menu);//Send this menu array to the router, so it can be used when rendering EJS views
let productRouter = require("./src/controller/productsRouter")(menu);
//morgan - middleware to mantain logs of application using the middleware whose name is morgan.
//and fs is one of the use that to write the logs of the file.
let morgan = require("morgan");
let fs = require("fs");
// const { expr } = require("jquery");
//to use morgan
//app.use(morgan('dev')) //gives log in terminal
//app.use(morgan('common'))//gives logs in terminal along with time and date

//Now to store these logs in the file using fs, we use {stream : }method of morgan along with
//fs method fs.createWriteStream and in that file name
app.use(morgan("common", { stream: fs.createWriteStream("./app.log") }));
// app.get("/", (req, res) => {
//   res.send("Hi from Express");
// });

//EJS: combine html content to node js
//There are 3 things we need to specify
//1. specify all static files present - use method
app.use(express.static(__dirname + "/public"));

//in views folder create index.ejs file
//2. Html file path : dynamic file in views- set method - set('views','path of view')
//app.set('views', './src/views');
app.set("views", "./src/views");

//3.set View ENgine - set('engine name ', 'package');
app.set("view engine", "ejs");

//now in app.get  instead of res.sent we use render,res.send is used for data and res.render is for file
//res.render('html finename only')

app.get("/", (req, res) => {
  //to pass data in ejs from app.js, in app.js after('index',{title:"Tip calculator"}) and in ejs <% title %>
  res.render("index", { title: "Home Page", menu });
});
// app.get('/',(req,res)=>{
//   res.render('index')
// })
//now how to use these routers for that we use use method
app.use("/category", categoryRouter); //(path, router we created)
app.use("/products", productRouter);

app.listen(port, (err) => {
  if (err) throw err;
  else {
    console.log(`The server is running on ${port}`);
  }
});
