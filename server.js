const express = require("express");
const helmet = require("helmet");

const accountsRouter = require("./accounts/accounts-Router.js");
const authRouter = require("./auth-router/auth-router.js");
const restrictedRouter = require("./auth-router/restricted-middleware.js");
const checkDepartment = require("./auth-router/check-department.js")


const server = express();



server.use(express.json())
server.use(helmet())

server.use("/api/accounts", restrictedRouter, checkDepartment ,accountsRouter)
server.use("/api/auth", authRouter)



module.exports = server;
