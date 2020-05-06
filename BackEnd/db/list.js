const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const listSchema = mongoose.Schema({
    _userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    name: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now }
})

// listSchema.plugin(uniqueValidator)// validation de l'adresse mail avant sauvegarder sur lr bd

module.exports = mongoose.model('List', listSchema);