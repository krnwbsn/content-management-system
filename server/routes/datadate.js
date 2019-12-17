var express = require('express');
var router = express.Router();
const Datadate = require('../models/datadate');

router.get('/', (req, res, next) => {
    Data.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;