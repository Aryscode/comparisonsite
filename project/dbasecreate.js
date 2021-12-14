const url="mongodb://127.0.0.1:27017";
var MongoClient = require('mongodb').MongoClient
MongoClient.connect(url)
.then((db)=>{
var dbase=db.db("Hi");
dbase.createCollection("users");
dbase.createCollection("professionals"); 
dbase.listCollections({name: "professional"})
.next(function(err, collinfo) {
    if (collinfo) {
        db.close();
    }
})
})
.catch((err)=>console.log(err));