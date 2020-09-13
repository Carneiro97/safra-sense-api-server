const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuarioLogin: { type: String,
         required: true,
         unique: true
    },
    senha: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', userSchema);