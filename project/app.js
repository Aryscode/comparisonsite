let id;
paths=["/Carpenters","/Painters", "/Plumbers", "/Electricians", "/Saloon"];
const express= require('express');
const app=express();
var ObjectId = require('mongodb').ObjectId;
const url="mongodb://127.0.0.1:27017";
var MongoClient = require('mongodb').MongoClient
MongoClient.connect(url)
.then((db)=>{
    app.listen(3000);
    console.log('connected to database, listening on Port 3000');
})
.catch((err)=>console.log(err));
paths.forEach(element => {
    app.get(element, (req,res)=>{
        res.redirect('/');
    })
});
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', (req,res)=>{
    let a=1;
    let proarr=[];
    myfunc3(proarr).then((proarr)=>{
        res.render('home',{ i: JSON.stringify(proarr[0])})
    })
})
app.get('/login', (req,res)=>{
    console.log("user landed on login");
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
    res.redirect('/ProfileUser/'+ id);})
}
    else if(req.body.Role=='Professional')
    {
        MongoClient.connect(url)
        .then((db)=>{
            let dbase=db.db("Hi");
            dbase.collection("professionals").insertOne(req.body, (err, res)=>{
                if(err)
                console.log(err);
                else
                db.close();
            });
        })
        .catch((err)=>console.log(err));
        myfunc2(req, false).then(()=>{
            res.redirect('/ProfilePro/'+ id);})
        }
})

app.get('/ProfileUser/:id',(req,res)=>{
    let proarr, proarr1;
    console.log(req.params.id);
    myfunc6(proarr1,proarr, req.params.id).then((proarr1, proarr)=>{
    myfunc3(proarr1,proarr).then((proarr2)=>
    {
    res.render('profileuser', {i:JSON.stringify(proarr2[0]), j:JSON.stringify(req.params.id), k:JSON.stringify(proarr2[1])})
    }
)})})
app.get('/ProfilePro/:id',(req,res)=>{
    let proarr;
    myfunc7(req.params.id).then((p)=>
    myfunc8(p).then((proarr)=>{
        res.render('profilepro', {o:JSON.stringify(proarr)})
    })

)})
app.get('/ProfileUser/:id/:jd/order',(req,res)=>{
    let proarr;
    myfunc4(proarr).then((proarr)=>{
    for(var i=0;i<proarr.length;i++)
    {
        if(proarr[i]._id==req.params.id)
    res.render('orders', {i1:JSON.stringify(proarr[i].MobileNumber), j : JSON.stringify(req.params.jd), k:JSON.stringify(req.params.id)})};
})
})
app.post('/ProfileUser/:id/:jd/order',(req,res)=>{
    console.log(req.body)
    myfunc9(req.params.id).then((p)=>
    {console.log(p);
   myfunc5({userm:p,Usermobilenumber:req.params.id,promobilenumber:req.params.jd, problem:req.body.Problem}).then(()=>
    {
        res.redirect("/ProfileUser/"+req.params.id);
    })})
})
var i=0;
app.post('/login',(req,res)=>{
    if(req.body.Role=='User')
    {
    myfunc(req, true).then(()=>{
    console.log(i);
        if(i==1)
        {
        res.redirect('/ProfileUser/'+ id);}
        else
        {
            res.render('login', {i:1})
        }})
    }
    else if(req.body.Role=='Professional')
    {
        myfunc2(req, true).then(()=>{
        console.log(i);
            if(i==1)
            {
            res.redirect('/ProfilePro/'+ id);}
            else
            {
                res.render('login', {i:1})
            }})
        }
})
app.post('/',(req,res)=>{
    console.log(req.body.search);
    res.redirect('/search/'+req.body.search)
})
app.get('/search/:id',(req,res)=>{
    console.log(req.params.id);
    let proarr=[];
    myfunc3(proarr).then((proarr)=>
    {
        res.render('searchpage',{ i: JSON.stringify(proarr[0]),j:JSON.stringify(req.params.id)})
    }
)
})
app.post('/search',(req,res)=>{
    console.log(req.body.search);
    res.redirect('/search/'+req.body.search)
})
app.use((req,res)=>{
    res.status(404).render('404');
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

function myfunc2(req,flag){
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url)
        .then((db)=>{
            let dbase=db.db("Hi");
            let a=req.body.MobileNumber;
            console.log(req.body);
            console.log(a);
            const error=false;
            dbase.collection("professionals").find({"MobileNumber" : a}).toArray((err,data)=>
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
function myfunc3(proarr1,proarr){
    return new Promise((resolve, reject)=>{
        const error=false;
        let p=proarr;
        MongoClient.connect(url)
    .then((db)=>{
        let dbase=db.db("Hi");
        dbase.collection("professionals").find().toArray((err,data)=>
        {
            p=data;
            if(!error)
            {
                proarr=p;
                // console.log(proarr)
                proarr2=[proarr, proarr1]
                resolve(proarr2);
            }
            else reject();  
       }
        )
    })
})
}
function myfunc4(proarr){
    return new Promise((resolve, reject)=>{
        const error=false;
        let p=proarr;
        MongoClient.connect(url)
    
    .then((db)=>{
        let dbase=db.db("Hi");
        dbase.collection("users").find().toArray((err,data)=>
        {
            p=data;
            if(!error)
            {
                proarr=p;
                resolve(p);
            }
            else reject();  
       }
        )
    })
})
}
function myfunc5(p){
    return new Promise((resolve, reject)=>{
        const error=false;
        MongoClient.connect(url)
        .then((db)=>{
            let dbase=db.db("Hi");
            dbase.collection("orders").insertOne(p, (err, res)=>{
                if(err)
                console.log(err);
                else
                {db.close();
                if(!error)
            {
                resolve();
            }
            else reject(); 
             } });
        }) 
       }
        )
    }
    function myfunc6(proarr,proarr1, id){
        return new Promise((resolve, reject)=>{
            const error=false;
            let p=proarr;
            MongoClient.connect(url)
        
        .then((db)=>{
            let dbase=db.db("Hi");
            console.log(id);
            dbase.collection("orders").find({"Usermobilenumber":id}).toArray((err,data)=>
            {
                p=data;
                // console.log(data)
                if(!error)
                {
                    proarr=p;
                    resolve(p, proarr1);
                }
                else reject();  
           }
            )
        })
    })
    }
    function myfunc7(id){
        return new Promise((resolve, reject)=>{
            const error=false;
            let p;
            MongoClient.connect(url)
        
        .then((db)=>{
            let dbase=db.db("Hi");
            console.log(id);
            var o_id = new ObjectId(id);
            dbase.collection("professionals").find({'_id':o_id}).toArray((err,data)=>
            {
                p=data[0].MobileNumber;
                console.log(data)
                if(!error)
                {
                    resolve(p);
                }
                else reject();  
           }
            )
        })
    })
    }
    function myfunc8(num){
        return new Promise((resolve, reject)=>{
            const error=false;
            let p;
            MongoClient.connect(url)
        
        .then((db)=>{
            let dbase=db.db("Hi");
            console.log(id);
            dbase.collection("orders").find({'promobilenumber':num}).toArray((err,data)=>
            {
                p=data;
                console.log(data)
                if(!error)
                {
                    resolve(p);
                }
                else reject();  
           }
            )
        })
    })
    }
    function myfunc9(id){
        return new Promise((resolve, reject)=>{
            const error=false;
            let p;
            id=id.toString();
            var o_id = new ObjectId(id);
            console.log(id);
            MongoClient.connect(url)
        
        .then((db)=>{
            let dbase=db.db("Hi");
            dbase.collection("users").find({"_id":o_id}).toArray((err,data)=>
            {
                console.log(data);
                if(!error)
                {
                    p=data[0].MobileNumber;
                    console.log(p);
                    resolve(p);
                }
                else reject();  
           }
            )
        })
    })
    }
