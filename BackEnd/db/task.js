const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const taskSchema = mongoose.Schema({
    _listId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'List' },
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    titre: { type: String, required: true },
    date: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    note: { type: String },
    created_at: { type: Date, required: true, default: Date.now }
})

// taskSchema.plugin(uniqueValidator)// validation de l'adresse mail avant sauvegarder sur lr bd

module.exports = mongoose.model('Task', taskSchema);