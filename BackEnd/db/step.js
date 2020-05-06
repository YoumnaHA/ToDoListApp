const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const stepSchema = mongoose.Schema({
    _taskId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'List'},
    label: { type: String, required: true },
    coche: { type: Boolean, default:false },
    created_at: { type: Date, required: true, default: Date.now }
})

// stepSchema.plugin(uniqueValidator)// validation de l'adresse mail avant sauvegarder sur lr bd

module.exports = mongoose.model('Step', stepSchema);