const Task = require('../db/task')
const express = require("express");

exports.getAlltasks = (req, res, next) => {
    console.log(req.query)
    // Task.find({
    //     _listId:req.params.user_id
    // })
    // Task.find({
    //     "_listId": "5eab29b1da7c343ae46dd813"
    // })
    Task.find(req.query)
        .then((task) => {
            res.status(201).json(task)
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.deleteATask = (req, res, next) => {

    Task.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'Tache supprimé'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.updateATask = (req, res, next) => {
    // const task = new Task({
    //     email: req.body.email,
    //     password: req.body.password
    // })
    console.log(req.params)
    // Task.updateOne(req.params, req.body)
    Task.updateOne({ _id: req.params.id }, req.body)
        .then((task) => {
            res.status(201).json({
                data:task,
                message: 'Mise è jour est avec succès!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
};

// exports.getListTasks = (req, res, next) => {
//     Task.find({
//         _listId:req.params.liste_id
//     })
//         .then((task) => {
//             res.status(201).json(task)
//         })
//         .catch((err) => {
//             res.status(400).json({
//                 error: err
//             })
//         })
// }

exports.createATask = (req, res, next) => {
    console.log('innn')
    console.log(req.body)
    const task = new Task({
        _userId:req.body._userId,
        _listId:req.body._listId,
        titre: req.body.titre
        })
    task.save()
        .then((data) => {
            res.status(201).json({
                data:data,
                message: 'task saved successfully!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}