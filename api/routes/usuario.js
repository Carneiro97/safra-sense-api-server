const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Usuario = require("../models/usuario");
const checkAuth = require('../middleware/check-auth');

// Get Usuarios request
router.get('/', checkAuth, (req, res, next) => {
  Usuario
      .find()
      .exec()
      .then(req => {
          const response = {
              count: req.length,
              usuarios: req.map(usuario => {
                  return {
                      _id: usuario._id,
                      usuarioLogin: usuario.usuarioLogin,
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

// Post login usuário request
router.post('/login', (req, res, next) => {
   Usuario
   .find({ usuarioLogin: req.body.usuarioLogin })
   .exec()
   .then(usuario => {
     if(usuario.length < 1) {
       return res.status(401).json(
         {
            message: 'A autenticação falhou.'
          });
     }
     bcrypt.compare(req.body.senha, usuario[0].senha, (err, result) => {
      if (err) {
        return res.status(401).json(
          {
             message: 'A autenticação falhou.'
           });
      }
      if (result) {
        const token = jwt.sign({ 
          usuarioLogin: usuario[0].usuarioLogin,
          _id: usuario[0]._id,
        }, 
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        });
        return res.status(200).json({
          message: 'Autenticado com sucesso!',
          token: token
        });
      }
      res.status(401).json(
        {
           message: 'A autenticação falhou.'
         });
     });
   })
   .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})

// Post novo usuário request
router.post("/signup", checkAuth, (req, res, next) => {
  Usuario.find({ usuarioLogin: req.body.usuarioLogin })
    .exec()
    .then((usuario) => {
      if (usuario.length > 0) {
        return res.status(409).json({
          message: "Login já utilizado.",
        });
      } else {
        bcrypt.hash(req.body.senha, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const usuario = new Usuario({
              _id: new mongoose.Types.ObjectId(),
              usuarioLogin: req.body.usuarioLogin,
              senha: hash,
            });
            usuario
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Usuário criado com sucesso!",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
});

// Delete usuario by usuario login
router.delete("/:usuarioLogin", checkAuth, (req, res, next) => {
    Usuario.remove({ usuarioLogin: req.params.usuarioLogin })
    .exec()
    .then(result => { 
        res.status(200).json({
            message: 'Usuário excluído.'
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

module.exports = router;
