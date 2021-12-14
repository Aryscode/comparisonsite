constexpress=require("express"); constapp=express();
constpath=require("path");
const{MongoClient}=require("mongodb"); app.use(express.json());
app.use(express.urlencoded({extended:true}));
consturi="mongodb://localhost:27017/Watch";
app.get("/",(req,res)=>{
res.sendFile(path.join( dirname,"watch.html")); });