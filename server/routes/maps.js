var express = require('express');
var router = express.Router();
const Map = require('../models/map');
const defaultResponse = require('../helper/response');

// search
router.post('/search', (req, res) => {
    const title = req.body.title;
    let response = {
        message: ''
    };
    if (title != undefined) {
        Map.find({ title }).then(data => {
            res.json(data);
        }).catch(err => res.status(500).json(err));
    } else {
        response.message = 'search title cannot be empty';
        res.status(500).json(response);
    };
});

// get list
router.get('/', (req, res, next) => {
    Map.find().then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// add
router.post('/', (req, res, next) => {
    const { title, lat, lng } = req.body;
    let response = { ...defaultResponse, data: { _id: '', title: '', lat: null, lng: null } }
    if (![title, lat, lng].includes(undefined)) {
        const map = new Map({
            title,
            lat,
            lng
        })
        map.save().then(result => {
            response.success = true;
            response.message = 'data have been added';
            response.data._id = result._id;
            response.data.title = result.title;
            response.data.lat = result.lat;
            response.data.lng = result.lng;
            res.status(201).json(response);
        }).catch(err => {
            response.message = 'failed to add some data'
            res.status(500).json(err)
        })
    } else {
        response.message = 'title, lat and lng cannot be empty'
        res.status(500).json(response)
    }
});

// edit
router.put('/:id', (req, res, next) => {
    const { title, lat, lng } = req.body;
    let response = { ...defaultResponse };
    if (![title, lat, lng].includes(undefined)) {
        const editData = {
            title: title || '',
            lng: lng || '',
            lat: lat || '',
        };

        Map.findByIdAndUpdate(req.params.id, editData).exec().then(before => {
            response.success = true;
            response.message = 'data have been update';
            response.data._id = req.params.id;
            response.data.title = title;
            response.data.lat = lat;
            response.data.lng = lng;
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
    Map.findByIdAndDelete(req.params.id).exec().then(before => {
        if (before) {
            response.success = true;
            response.message = 'data have been deleted';
            response.data._id = req.params.id;
            response.data.title = before.title;
            response.data.lat = before.lat;
            response.data.lng = before.lng;
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
    Map.findById(req.params.id).then(result => {
        response.success = true;
        response.message = 'Data found';
        response.data._id = req.params.id;
        response.data.title = result.title;
        response.data.lat = result.lat;
        response.data.lng = result.lng;
        res.status(200).json(response);
    }).catch(err => {
        response.message = 'data not found';
        res.status(500).json(err);
    })
});

module.exports = router;