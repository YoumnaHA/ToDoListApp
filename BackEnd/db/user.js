const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now }
})

userSchema.plugin(uniqueValidator)// validation de l'adresse mail avant sauvegarder sur lr bd

module.exports = mongoose.model('User', userSchema);