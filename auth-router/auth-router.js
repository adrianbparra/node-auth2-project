const express = require("express");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbAccounts = require("../accounts/accounts-model.js");
const secrets = require("../config/secrets.js");


const server  = express.Router();


server.post("/register", (req,res) =>{
    

    var user = req.body;

    const hash = bcrypt.hashSync(user.password, 12)

    user.password = hash

    dbAccounts.findBy({username: user.username}).first()
        .then(usr =>{
            
            if (!usr){
                
                dbAccounts.add(user)
                    .then(account => {
                        res.status(201).json(account)
                })
                .catch(err => res.status(500).json({errorMessage: "Server Erorr", err}))
            
            } else {
                res.status(401).json({message: "Username is already taken"})
            }
        })


    

})

server.post("/login", (req,res)=>{
    var {username, password} = req.body;

    dbAccounts.findBy({username}).first()
        .then(user => {
           

            if(user && bcrypt.compareSync(password, user.password)){

                const token = generateToken(user)

                 res.status(200).json({message: `Welcome ${user.username}`,token})

            } else {
                res.status(401).json({message: "You shall not pass!"})
            }
        })
        .catch(err => res.status(500).json({errorMessage: "Server Error", err}))
})


function generateToken(user){
    const payload = {
        subject : user.id,
        username: user.username,
        department : user.department
    }

    const options = {
        expiresIn: "1 hr"

    }

    return jwt.sign(payload,secrets.jwtSecret,options)
    
}


module.exports = server;