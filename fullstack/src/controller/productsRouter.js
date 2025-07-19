let express = require("express");
let productRouter = express.Router();

let mongodb = require("mongodb").MongoClient;
let url = process.env.MONGO_URL;
function router(menu) {
  productRouter.route("/").get((req, res) => {
    mongodb.connect(url, function (err, dc) {
      if (err) {
        res.status(500).send("Error while connecting");
      } else {
        let dbObj = dc.db("nodedb");
        dbObj
          .collection("products")
          .find()
          .toArray(function (err, result) {
            if (err) {
              res.status(203).send("Error while fetching");
            } else {
              res.render("products", {
                title: "Products Page",
                data: result,
                menu,
              });
            }
          });
      }
    });
    //res.render("products", { title: "Products Page", data: products, menu }); //this is the same `menu` from App.js
  });

  productRouter.route("/details").get((req, res) => {
    res.send("Product Details");
  });

  return productRouter;
}

module.exports = router;
