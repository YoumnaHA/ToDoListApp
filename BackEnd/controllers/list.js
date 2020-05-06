const List = require('../db/list')
const express = require("express");

exports.getAllLists = (req, res, next) => {
    List.find(req.query)
        .then((list) => {
            res.status(201).json(list)
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.createAListe = (req, res, next) => {
    const list = new List({
        _userId: req.body._userId,
        name: req.body.name
    })
    // list.save((err,data)=>{
    //     if(err){
    //         res.status(400).json({
    //                     error: err
    //                 })
    //     }
    //     res.status(201).json({
    //                 data:data,
    //                 message: 'list saved successfully!'
    //             })
    // })
    list.save()
        .then((data) => {
            res.status(201).json({
                data:data,
                message: 'list saved successfully!'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}

exports.deleteAListe = (req, res, next) => {
    console.log(req.params)

    List.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'Liste supprimé'
            })
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
}