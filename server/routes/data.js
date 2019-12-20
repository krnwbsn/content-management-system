var express = require('express');
var router = express.Router();
const Data = require('../models/data');

router.post('/search', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        message: ''
    }
    if (letter != undefined || frequency.toString() != 'NaN') {
        let filterData = {};
        letter ? filterData.letter = { $regex: letter, $options: 'i' } : undefined;
        frequency ? filterData.frequency = Number(frequency) : undefined;

        Data.find(filterData).then(data => {
            res.json(data);
        }).catch(err => res.status(400).json(err));
    } else {
        response.message = 'Search data cannot be empty'
        res.status(400).json(response)
    }
});

router.get('/', (req, res, next) => {
    Data.find().then(result => {
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
        const data = new Data({
            letter,
            frequency
        })
        data.save().then(result => {
            response.success = true;
            response.message = 'data have been added';
            response.data._id = result.id;
            response.data.letter = result.letter;
            response.data.frequency = result.frequency;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'letter and frequency cannot be empty'
            res.status(400).json(response)
        })
    } else {
        response.message = 'Add data cannot be empty'
        res.status(400).json(response)
    }
})

router.put('/:id', (req, res, next) => {
    const { letter, frequency } = req.body;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Data.findOneAndUpdate(
        { _id: req.params.id }, { letter: letter, frequency: frequency }
    ).then(result => {
        response.success = true;
        response.message = 'data have been updated';
        response.data.letter = letter;
        response.data.frequency = frequency;
        response.data._id = req.params.id;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'data not modified';
        console.log(err)
    })
});

router.delete('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Data.findOneAndRemove(
        { _id: req.params.id }
    ).then(result => {
        response.success = true;
        response.message = 'data has been deleted';
        response.data._id = req.params.id;
        response.data.letter = result.letter;
        response.data.frequency = result.frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'data not deleted';
        console.log(err)
    })
});

router.get('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Data.findById(
        { _id: req.params.id }
    ).then(result => {
        response.success = true;
        response.message = 'data has been deleted';
        response.data._id = req.params.id;
        response.data.letter = result.letter;
        response.data.frequency = result.frequency;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'data not found';
        console.log(err)
    })
})

module.exports = router;