const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient;
const urldb = `mongodb+srv://thecasalegno:VD8FBjcrswvjdQtM@nebiolotv.yknvfqp.mongodb.net/test`;

app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    MongoClient.connect(urldb, function (err, db) {
        const dbID = db.db("NebioloTV");
        let pettorale= req.body.pettorale
        let misura= req.body.misura
    
        if (err) throw err;
        dbID.collection("risultati").find({ tipo: "alto" }).toArray((err, result) => {
            if(err){console.log(err)}

            let pettoraleHJ = result[0].pettorale
            let misuraHJ = result[0].misura

            dbID.collection("risultati").find({ tipo: "disco" }).toArray((err, result) => {
                if(err){console.log(err)}
    
                let pettoraleD = result[0].pettorale
                let misuraD = result[0].misura

                dbID.collection("risultati").find({ tipo: "disco" }).toArray((err, result) => {
                    if(err){console.log(err)}
        
                    let pettoraleD = result[0].pettorale
                    let misuraD = result[0].misura

                    dbID.collection("risultati").find({ tipo: "giavellotto" }).toArray((err, result) => {
                        if(err){console.log(err)}
            
                        let pettoraleG = result[0].pettorale
                        let misuraG = result[0].misura

                        dbID.collection("risultati").find({ tipo: "lungo" }).toArray((err, result) => {
                            if(err){console.log(err)}
                
                            let pettoraleLJ = result[0].pettorale
                            let misuraLJ = result[0].misura

                            dbID.collection("risultati").find({ tipo: "martello" }).toArray((err, result) => {
                                if(err){console.log(err)}
                    
                                let pettoraleM = result[0].pettorale
                                let misuraM = result[0].misura

                                dbID.collection("risultati").find({ tipo: "peso" }).toArray((err, result) => {
                                    if(err){console.log(err)}
                        
                                    let pettoraleP = result[0].pettorale
                                    let misuraP = result[0].misura

                                    res.render("index", {
                                        pettoraleHJ,
                                        pettoraleD,
                                        pettoraleG,
                                        pettoraleLJ,
                                        pettoraleM,
                                        pettoraleP,
                                        misuraHJ,
                                        misuraD,
                                        misuraG,
                                        misuraLJ,
                                        misuraM,
                                        misuraP,
                                    });
                                    
                                });
                                
                            });
                            
                        });
                        
                    });
                    
                });
                
            });

        });

    })
})

const martello = require('./routes/martello')
const peso = require('./routes/peso')
const disco = require('./routes/disco')
const alto = require('./routes/alto')
const giavellotto = require('./routes/giavellotto')
const lungo = require('./routes/lungo')

app.use("/martello", martello)
app.use("/peso", peso)
app.use("/disco", disco)
app.use("/alto", alto)
app.use("/giavellotto", giavellotto)
app.use("/lungo", lungo)


app.listen(5000)