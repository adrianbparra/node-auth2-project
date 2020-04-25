const express = require("express");

const server  = express.Router();
const dbAccounts = require("./accounts-model.js")



server.get("/", (req,res) =>{
    dbAccounts.findBy({department: req.decodedToken.department})
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => res.status(500).json({errorMessage: "Server Error", err}))
})


module.exports = server;