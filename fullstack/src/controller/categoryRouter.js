let express = require('express');
let categoryRouter = express.Router();
//Mongodb m1. need to import mongodb so use require
let mongodb = require('mongodb').MongoClient;
//let url = "mongodb://localhost:27017"; //or store it in env file and get it from there
let url = process.env.MONGO_URL;
//m2- remove category data to get it from mongodb

function router(menu) {
    categoryRouter.route('/')
        .get((req, res) => {
            mongodb.connect(url, function(err, dc){
                //error message if failed to connect
                if(err){
                    res.status(500).send("Error while connecting")
                }
                //data fetching
                else{
                    //create database object and then access collecttion and get data
                    let dbObj = dc.db('nodedb');
                    dbObj.collection('category').find().toArray(function(err,result){
                        if(err){
                            res.status(203).send("Error while fetching");
                        } else{
                            res.render('category', {title:'Category Page', category:result, menu});
                        }
                    })
                }
            })
            //res.render('category', { title: 'Category Page', category: category, menu }); //this is the same `menu` from App.js
        });

    categoryRouter.route('/details')
        .get((req, res) => {
            res.send('Category Details');
        });

    return categoryRouter;
}

module.exports = router;
