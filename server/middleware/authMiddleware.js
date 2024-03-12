const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//This middleware makes sure the user is authenticated before accessing protected routes
const requireAuth = (req, res, next) => {
   const token = res.cookies
   console.log(res.cookies, req.cookies)
    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
    //         if (err) {
    //             res.status(403).json({ message: "You're not authorized to access this route" })
    //             console.log(err)
    //         }
    //         else {
    //             console.log(decodedToken)
    //             next()

    //         }
    //     })
    // }
    // else {
    //     res.status(403).json({ message: "You're not authorized to access this route" })
    // }

    next()
}
module.exports = requireAuth