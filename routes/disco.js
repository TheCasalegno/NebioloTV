const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const urldb = process.env.db;

router.post("/", (req, res) => {
  MongoClient.connect(urldb, function (err, db) {
    const dbID = db.db("NebioloTV");
    let pettorale= req.body.pettorale
    let misura= req.body.misura

    if (err) throw err;
    dbID.collection("risultati").updateOne({tipo: "disco"}, {$set:{pettorale: req.body.pettorale, misura: req.body.misura}});
    if (err) throw err;
    res.render("disco", {
        pettorale,
        misura
    });
  });
});

router.get("/", (req, res) => {
    let misura= ""
    let pettorale=""
  res.render("disco", {
    misura,
    pettorale
  });
});

module.exports = router;
