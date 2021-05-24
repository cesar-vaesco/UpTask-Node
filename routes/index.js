
const express = require('express');
const router = require('express').Router();





module.exports = () => {

    // ruta para el home
    router.get('/', (req, res) => {
        res.send('Index')
    });

    router.get('/nosotros', (req, res) => {
        res.send('Nosotros....')
    });

    return router;
}
