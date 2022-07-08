const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require ('dotenv').config();
var mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 300;
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:'webdb'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql db Connected!");
  });

  //post datailfor evplugin
   app.post('/insert-evplugin', (req, res) => { 
     let object=req.body;
     console.log(req.body);
     con.query("insert into evplugin set ?",[object],(err,data)=>{
        if(err){
          console.log(err);
          res.status(404).send({message:'err'})
          return;
        } else {
          res.status(200).send({message:'success' });  
        }
          });
          });
 
//insert into merchants into db
 app.post('/insert_SRun_merchants', (req, res) => { 
 let object=req.body;
 console.log(req.body)
 con.query(" insert into SRun_merchants set ?",[(object)],(err,data)=>{
if(err){
console.log(err);
res.status(404).send({message:'err'})
    return;
} else {
res.status(200).send({message:'success'})
     }
        });
     });      

 //insert into sul into db
 app.post('/insert_sulNewsLetter',(req, res) => { 
 let object=req.body;
 console.log(req.body)
 con.query(" insert into sul_newsletter set ?",[(object)],(err,data)=>{
 if(err){
    console.log(err);
 res.status(404).send ({message:'err'})
    return;
    } else {
 res.status(200).send({message:'success'})
    }
    });
        });
         
        
 //insert scooapaNewsLetter
 app.post('/insert_scoopaNewsLetter', (req, res) =>{ 
  let object=req.body;
  console.log(req.body)
 con.query(" insert into scoopa_newsletter set ?",[(object)],(err,data)=>{ 
    if(err){
  console.log(err);
 res.status(404).send({message:'err'})
     return;
      } else {
res.status(200).send ({message:'success'})
         }
         });
            });

//insert into guraride_newsletter
  app.post('/insert_guraride_newsletter', (req, res) => {                
    let object=req.body;
    console.log(req.body)
 con.query(" insert into guraride_newsletter set ?",[(object)],(err,data)=>{
     if(err){
     console.log(err);
     res.status(404).send({message:'err'})
      return;
      } else {
        res.status(200).send({message:'success'})
             }
            });
              }); 

              
             // insert SRun_runner_modal in db
              const storage=multer.diskStorage({
                destination:'./upload',
      
                filename:(req,file,cb)=>{
                return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
                }
                
                })
              const upload = multer({ storage : storage });
              var uploadMultiple = upload.fields([{name:'uploaddrivers_license', maxCount: 1 }, {name:'drivers_licenseNumber', maxCount: 1 },{name:'cvUpload',maxCount:1},{name:'passportUpload',maxCount:1}])
              //app.use('/files',express.static('upload'));

              app.post('/insert_SRun_runner_modal',uploadMultiple,(req,res)=>{ 
                
              // console.log(req.files['uploaddrivers_license'][0].filename);
              // console.log(req.files['drivers_licenseNumber'][0].filename)
               const object=({
                  FirstName:req.body.FirstName,
                  LastName:req.body.LastName,
                  address:req.body.address,
                  PhoneNumber:req.body.PhoneNumber,
                  email:req.body.email,
                  YearOfExperience:req.body.YearOfExperience,
                  uploaddrivers_license:'http://localhost:300/files/' + req.files['uploaddrivers_license'][0].filename,
                  drivers_licenseNumber:'http://localhost:300/files/' + req.files['drivers_licenseNumber'][0].filename,
                  cvUpload:'http://localhost:300/files/' + req.files['cvUpload'][0].filename,
                 passportUpload:'http://localhost:300/files/' + req.files['passportUpload'][0].filename,
                 EducationalBackground:req.body.EducationalBackground,
                 languages:req.body.languages,
                 googleMap:req.body.googleMap,
                 social_media :req.body.social_media,
                 PrivacyPolicy:req.body.PrivacyPolicy
              })
              var sql= "insert into SRun_runner_modal set ?"
              con.query(sql,[(object)],(error,data)=>{
               if(error){
                 console.log(error);
                   res.status(404).send({message:'error'})
                   return;
                 }
                 res.status(200).send({message:'success'})
               console.log(object);
               })

              })


  app.listen(port, function(){
    console.log("Listening to port " +port); 
    });












       /*app.post('/example', (req, res) => {
          res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
           });*/
          
  /*app.post('/add', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New employee has been added");
      res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
    });
});
});*/