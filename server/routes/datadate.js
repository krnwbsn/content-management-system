var express = require('express');
var router = express.Router();
const Datadate = require('../models/datadate');

router.post('/search', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        message: ''
    }
    if (letter != undefined || frequency.toString() != 'NaN') {
        let filterData = {};
        letter ? filterData.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterData.frequency = Number(frequency) : undefined;

        Datadate.find(filterData).then(data => {
            res.json(data);
        }).catch(err => res.status(400).json(err));
    } else {
        response.message = 'Search datadate cannot be empty'
        res.status(400).json(response)
    }
});

router.get('/', (req, res, next) => {
    Datadate.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        success: false,
        message: '',
        data: { _id: '', letter: '', frequency: null }
    }
    if (letter != undefined || frequency != undefined) {
        const datadate = new Datadate({
            letter,
            frequency
        })
        datadate.save().then(result => {
            response.success = true;
            response.message = 'datadate have been added';
            response.data._id = result.id
            response.data.letter = result.letter;
            response.data.frequency = result.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'letter and frequency cannot be empty'
            res.status(400).json(response)
        })
    } else {
        response.message = 'Add datadate cannot be empty'
        res.status(400).json(response)
    }
});

router.put('/:id', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findOneAndUpdate(
        { _id: req.params.id }, { letter: letter, frequency: frequency }, { new: true }
    ).then(result => {
        response.success = true;
        response.message = 'datadate have been updated';
        response.data.letter = letter;
        response.data.frequency = frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'datadate not modified'
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findOneAndRemove(
        { _id: req.params.id }
    ).then(result => {
        response.success = true;
        response.message = 'datadate has been deleted';
        response.data._id = req.params.id;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'datadate not deleted';
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findById(id).then(result => {
        response.success = true;
        response.message = 'Datadate found';
        response.data._id = id;
        response.data.letter = result.letter;
        response.data.frequency = result.frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'Datadate not found';
        res.status(500).json(err);
    })
});

module.exports = router;