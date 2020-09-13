const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Empresa = require('../models/empresa');
const checkAuth = require('../middleware/check-auth');

// Get Empresas request
router.get('/', (empresas, res, next) => {
    Empresa
        .find()
        .exec()
        .then(empresas => {
            const response = {
                count: empresas.length,
                empresas: empresas.map(empresa => {
                    return {
                        _id: empresa._id,
                        nome: empresa.nome,
                        codigo: empresa.codigo,
                        noticias: empresa.noticias.map(noticia => {
                            return {
                                _id: noticia._id,
                                data: noticia.data,
                                texto: noticia.texto,
                                url: noticia.url,
                                sentimento: noticia.sentimento,
                            }
                        })
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
});

// Get empresas by id request
router.get('/:codigoEmpresa', (req, res, next) => {
    const codigo = req.params.codigoEmpresa;
    Empresa
        .find({ codigo: codigo })
        .exec()
        .then(doc => {
            if (doc) {
                return res.status(200).json({
                    empresa: doc,
                });
            } else {
                return res.status(404).json({
                    message: 'Nenhuma empresa encontrada com esse código.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// Post nova empresa request
router.post('/', checkAuth, (req, res, next) => {
    const empresa = new Empresa({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        codigo: req.body.codigo,
    });
    empresa
        .save()
        .then(result => {
            res.status(201).json({
                mensagem: 'Empresa cadastrada com sucesso!',
                empresaCriada: {
                    _id: result._id,
                    nome: result.nome,
                    codigo: result.codigo,
                    noticias: result.noticias
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// Post Nova notícia request
router.post('/:codigoEmpresa/noticia', checkAuth, (req, res, next) => {
    const codigo = req.params.codigoEmpresa;
    var novaNoticia = req.body;
    Empresa
        .update(
            { codigo: codigo }, 
            { $push: { noticias: novaNoticia } },
        )
        .then(result => {
            res.status(200).json({
                message: 'Notícias incluídas!',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3030/empresas/' + codigo
                }
            });

        })
        .catch(err => {
            console.log('err');
            res.status(500).json({
                error: err
            })
        })
});

// Delete empresa request
router.delete('/:codigoEmpresa', checkAuth, (req, res, next) => {
    const codigo = req.params.codigoEmpresa;
    Empresa.remove({ codigo: codigo })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Empresa deletada!',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;