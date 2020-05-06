const Step = require('../db/step')
const express = require("express");

exports.getAllsteps = (req, res, next) => {
    console.log(req.params)
    Step.find({
        _taskId:req.params.id
    })
    // Step.find(req.query)
        .then((step) => {
            res.status(201).json(step)
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.createAStep = (req, res, next) => {
    console.log('innn')
    console.log(req.body)
    const step = new Step({
        _taskId:req.body._taskId,
        label: req.body.label,
        coche: req.body.coche
    })
    step.save()
        .then(() => {
            res.status(201).json({
                message: 'task saved successfully!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.deleteAStep = (req, res, next) => {
    console.log(req.params)
    Step.deleteOne({ _id: req.params.id })
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


exports.updateAStep = (req, res, next) => {

    const step = new Step({
        coche: req.body.email,
        password: req.body.password
    })
    Step.updateOne({ _id: req.params.id }, req.body)
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