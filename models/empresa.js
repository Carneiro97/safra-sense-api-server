const mongoose = require('mongoose');

const empresaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {type: String, required: true },
    codigo: {type: String, required: true },
    noticias: [{
        _id: mongoose.Schema.Types.ObjectId,
        data: {type: String, required: true},
        texto: {type: String, required: true},
        url: {type: String, required: true},
        sentimento: {type: Number, required: false},
    }],
});

module.exports = mongoose.model('Empresa', empresaSchema);
