let id;
const express= require('express');
const app=express();
const url="mongodb://127.0.0.1:27017";
var MongoClient = require('mongodb').MongoClient
MongoClient.connect(url)
.then((db)=>{
    app.listen(3000);
    console.log('connected to database, listening on Port 3000');
})
.catch((err)=>console.log(err));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    res.render("./project");
});
app.use(express.static(__dirname + '/public/'));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next();});

    app.get('/', (req,res)=>{
        myfunc().then(()=>{
            res.render('project')
        })
    })
    app.get('/login', (req,res)=>{
        res.render('login', {i:0})
    })
    
    app.get('/signup', (req,res)=>{
        res.render('signup')
    })
    app.post('/signup',(req,res)=>{
        console.log(req.body);
        if(req.body.Role=='User')
    {
    MongoClient.connect(url)
    .then((db)=>{
        let dbase=db.db("Hi");
        dbase.collection("users").insertOne(req.body, (err, res)=>{
            if(err)
            console.log(err);
            else
            db.close();
        });
    })
    .catch((err)=>console.log(err));
    myfunc(req, false).then(()=>{
        res.redirect('/');})
    }   
    })
    app.get('/:id',(req,res)=>{
        console.log(req.params.id);

        res.render('project')
    })
    // app.get('/project/:id',(req,res)=>{
    //     res.render('project')
    // })
    
    
    var i=0;
    app.post('/login',(req,res)=>{
        if(req.body.Role=='User')
        {
        myfunc(req, true).then(()=>{
        console.log(i);
            if(i==1)
            {
            res.redirect('/'+ id);}
            else
            {
                res.render('login', {i:1})
            }})
        }
    })
    // app.post('/',(req,res)=>{
    //     console.log(req.body.search);
    //     res.redirect('/search/'+req.body.search)
    // })
    // app.get('/search/:id',(req,res)=>{
    //     console.log(req.params.id);
    //     let proarr=[];
    //     myfunc(proarr).then((proarr)=>
    //     {
    //         res.render('searchpage',{ i: JSON.stringify(proarr),j:JSON.stringify(req.params.id)})
    //     }
    // )
    // })
    app.post('/search',(req,res)=>{
        console.log(req.body.search);
        res.redirect('/search/'+req.body.search)
    })

    function myfunc(req,flag){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(url)
            .then((db)=>{
                let dbase=db.db("Hi");
                let a=req.body.MobileNumber;
                console.log(req.body);
                console.log(a);
                const error=false;
                dbase.collection("users").find({"MobileNumber" : a}).toArray((err,data)=>
                {
                    console.log(data);
                    if(data.length==0)
                    {
                        if(!error)
                    {i=0;
                    resolve();
             }
             else reject();
            }
            else{
                    id=data[0]._id.toString();
                    console.log(id);
                    if(flag)
                    {
                        
                    if(data[0].Password==req.body.Password)
                    {
                        i=1;
                        console.log(i);
                    db.close();
             if(!error)
             {
                 resolve();
             }
             else reject();  
        }
        else
        {
            i=0;
            console.log(i);
            if(!error)
             {
                 resolve();
             }
             else reject(); 
        }
                 }
                else
                {
                    if(!error)
             {
                 resolve();
             }
             else reject();  
                }}
                })
                })
            })
    }