

module.exports = (req,res,next) =>{

    // console.log(req.decodedToken.department)
    
    if(req.decodedToken.department){
        next()
    } else {
        res.status(403).json({message: "You don't have permission to see users"})
    }
}