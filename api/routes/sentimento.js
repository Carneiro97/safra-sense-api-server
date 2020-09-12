const express = require('express');
const router = express.Router();

const Empresa = require('../models/empresa');

const SentimentoEnum = require('../enums/sentimentoEnum');


// Get sentimento request
router.get('/', (req, res, next) => {
            res.status(200).json({
                sentimento: SentimentoEnum.returnName[Math.floor(Math.random() * 3)]
            })
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
});

// Get all sentimentos from a company
router.get('/:codigoEmpresa', (req, res, next) => {
    const codigo = req.params.codigoEmpresa;
    var sentimentos = [];
    var somaSentimentos = 0;
    Empresa
    .find({ codigo: codigo })
    .exec()
    .then(doc => {
        if (doc) {
            doc[0].noticias.map((noticia) => {
                sentimentos.push(noticia.sentimento);
                somaSentimentos += noticia.sentimento;
            });
            return res.status(200).json({
                nome: doc[0].nome,
                quantidade: sentimentos.length,
                sentimento: SentimentoEnum.returnName[Math.floor(somaSentimentos/sentimentos.length)],
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

// Get sentimentos from a company by period of time
router.get('/data/:codigoEmpresa', (req, res, next) => {
    const codigo = req.params.codigoEmpresa;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;
    var sentimentos = [];
    var somaSentimentos = 0;
    Empresa
    .find({ codigo: codigo })
    .exec()
    .then(doc => {
        if (doc) {
            doc[0].noticias.filter((noticia) => noticia.data >= dataInicio && noticia.data <= dataFim)
            .map((filteredNoticia) => {
                sentimentos.push(filteredNoticia.sentimento);
                somaSentimentos += filteredNoticia.sentimento;
            });
            return res.status(200).json({
                nome: doc[0].nome,
                dataInicio: dataInicio,
                dataFim: dataFim,
                quantidade: sentimentos.length,
                sentimento: SentimentoEnum.returnName[Math.floor(somaSentimentos/sentimentos.length)]
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

module.exports = router;
