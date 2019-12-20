var express = require('express');
var router = express.Router();
const Datadate = require('../models/datadate');

// search
router.post('/search', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        message: ''
    };
    if (letter != undefined || frequency.toString() != 'NaN') {
        let filterData = {};
        letter ? filterData.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterData.frequency = Number(frequency) : undefined;

        Datadate.find(filterData).then(data => {
            res.json(data);
        }).catch(err => res.status(500).json(err));
    } else {
        response.message = 'search data cannot be empty'
        res.status(500).json(response)
    };
});

// get list
router.get('/', (req, res, next) => {
    Datadate.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// add
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
            response.message = 'data have been added';
            response.data._id = result._id
            response.data.letter = result.letter;
            response.data.frequency = result.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'failed to add'
            res.status(500).json(err)
        })
    } else {
        response.message = 'letter and frequency cannot be empty'
        res.status(500).json(response)
    };
});

// edit
router.put('/:id', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        success: false,
        message: '',
        data: {}
    };
    if (letter != undefined || frequency != undefined) {
        let editData = {};
        letter ? editData.letter = letter : '';
        frequency ? editData.frequency = frequency : '';

        Datadate.findByIdAndUpdate(req.params.id, editData).exec().then(before => {
            response.success = true;
            response.message = 'data have been update';
            response.data._id = req.params.id;
            response.data.letter = letter;
            response.data.frequency = frequency;
            res.status(201).json(response);
        })
    } else {
        response.message = 'field cannot be empty';
        res.status(500).json(response);
    };
});

// delete
router.delete('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findByIdAndDelete(req.params.id).exec().then(before => {
        if (before) {
            response.success = true;
            response.message = 'data have been deleted';
            response.data._id = req.params.id;
            response.data.letter = before.letter;
            response.data.frequency = before.frequency;
            res.status(201).json(response);
        } else {
            response.message = 'deleted failed, no data found';
            res.status(500).json(response);
        };
    });
});

// browse
router.get('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Datadate.findById(req.params.id).exec().then(result => {
        response.success = true;
        response.message = 'data found';
        response.data._id = req.params.id;
        response.data.letter = result.letter;
        response.data.frequency = result.frequency;
        res.status(200).json(response);
    }).catch(err => {
        response.message = 'data not found';
        res.status(500).json(err);
    });
});

module.exports = router;