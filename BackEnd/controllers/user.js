const User = require('../db/user')
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'Un mail de confirmation vous a été envoyé'
                    })
                })
                .catch(() => {
                    res.json({
                        error: "Cette adresse e-mail est déjà utilisée"
                    })
                })
        })
}

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            if (!user) {
                return res.json({
                    error: 'Utilisateur n\'existe pas !!'
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.json({
                            error: 'Mot de pas ne correspond pas !!'
                        })
                    }
                    const token = jwt.sign(
                        { user_id: user._id },
                        'random_token_string',
                        { expiresIn: '24h' }
                    )
                    res.status(200).json({
                        user_id: user._id,
                        email: user.email,
                        token: token
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        error: 'err'
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({//500-server erreur
                error: 'err'
            })
        })
}

exports.updateEmail = (req, res, next) => {

    const user = new User({
        _id: req.body.user_id,
        email: req.body.email
    })
    console.log(user)
    console.log(req.body)
    User.updateOne({ _id: req.body.user_id }, user)
        .then(() => {
            res.status(201).json({
                message: 'Mise à jour est avec succès!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.updatePassword = (req, res, next) => {

    User.findOne({
        _id: req.body.user_id
    }).then((user) => {
        bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
                if (!valid) {
                    return res.json({
                        error: 'Mot de passe actuel ne correspond pas !!'
                    })
                }
                bcrypt.hash(req.body.n_password, 10).then((hash) => {
                    const user = new User({
                        _id: req.body.user_id,
                        password: hash
                    })
                    User.updateOne({ _id: req.body.user_id }, user)
                        .then(() => {
                            res.status(201).json({
                                message: 'Mise à jour est avec succès!'
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                error: err
                            })
                        })
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: 'err'
                })
            })
    }).catch((err) => {
        res.status(500).json({//500-server erreur
            error: 'err'
        })
    })
}


exports.resetPassword = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur n\'existe pas !!'
                })
            }
            res.status(200).json({
                message: 'Si cette adresse e-mail correspond à un compte existant, un mail y a été envoyé'
            })
            /////
        })
        .catch((err) => {
            res.status(500).json({//500-server erreur
                error: 'err'
            })
        })
}












exports.createUser = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save()
        .then(() => {
            res.status(201).json({
                message: 'User saved successfully!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.getAllUser = (req, res, next) => {
    console.log('in')
    User.find()
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.getOneUser = (req, res, next) => {
    User.findOne({
        email: req.params.id
    })
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}


exports.modifyUser = (req, res, next) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    User.updateOne({ _id: req.params.id }, user)
        .then(() => {
            res.status(201).json({
                message: 'Mise è jour est avec succès!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
};

exports.deleteUser = (req, res, next) => {

    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'Utilisateur supprimé'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}