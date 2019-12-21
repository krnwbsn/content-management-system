var express = require('express');
var router = express.Router();
const Data = require('../models/data');
const defaultResponse = require('../helper/response');

// search
router.post('/search', function (req, res) {
    const { letter, frequency } = req.body;
    let response = {
        message: ''
    };
    if (letter != undefined || frequency != 'NaN') {
        let filterData = {};
        letter ? filterData.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterData.frequency = Number(frequency) : undefined;

        Data.find(filterData).then(data => {
            res.json(data);
        }).catch(err => res.status(500).json(err));
    } else {
        response.message = 'search data cannot be empty'
        res.status(500).json(response)
    };
});

// get list
router.get('/', (req, res, next) => {
    Data.find().then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// bar
router.get('/bar', function (req, res) {
    Data.aggregate().group(
        {
            _id: "$letter",
            total: { $sum: "$frequency" }
        }
    ).then((data) => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(response);
    });
});

// add
router.post('/', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = { ...defaultResponse, data: { _id: '', title: '', lat: null, lng: null } }
    if (![letter, frequency].includes(undefined)) {
        const data = new Data({
            letter,
            frequency
        })
        data.save().then(result => {
            console.log(result)
            response.success = true;
            response.message = 'data have been added';
            response.data._id = result._id;
            response.data.letter = result.letter;
            response.data.frequency = result.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'failed to add some data'
            res.status(500).json(err)
        });
    } else {
        response.message = 'letter and frequency cannot be empty'
        res.status(500).json(response)
    };
});

// edit
router.put('/:id', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = { ...defaultResponse }
    if (![letter, frequency].includes(undefined)) {
        const editData = {
            letter: letter || '',
            frequency: frequency || ''
        };

        Data.findByIdAndUpdate(req.params.id, editData).exec().then(before => {
            response.success = true;
            response.message = 'data have been update';
            response.data._id = req.params.id;
            response.data.letter = letter;
            response.data.frequency = frequency;
            res.status(201).json(response);
        });
    } else {
        response.message = 'field cannot be empty';
        res.status(500).json(response);
    };
});

// delete
router.delete('/:id', (req, res, next) => {
    let response = { ...defaultResponse }
    Data.findByIdAndDelete(req.params.id).exec().then(before => {
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
    let response = { ...defaultResponse }
    Data.findById(req.params.id).exec().then(result => {
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