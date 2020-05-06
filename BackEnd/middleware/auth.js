const express = require("express");
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]////hader authorization
        const decodedToken = jwt.verify(token, 'random_token_string')
        const user_id = decodedToken.user_id
        console.log(user_id)
        if (req.body.user_id && req.body.user_id !== user_id) {
            throw 'Invalide Id user'
        }
        else {
            next()
        }
    } catch (e) {
        res.status(401).json({
            error: e
        })
    }
}
