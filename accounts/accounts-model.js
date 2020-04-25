const db = require("../database/dbConfig.js")

function find(){
    return db("accounts")
}

function findBy(filter) {
    return db("accounts").where(filter)
}

async function add(accountInfo) {
    const [id] = await db("accounts").insert(accountInfo)

    return findById(id)
}

function findById(id) {
    return db('accounts').where({id}).first()
}



module.exports = {
    findBy,
    add,
    find,
    findById
}