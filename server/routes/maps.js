var express = require('express');
var router = express.Router();
const Map = require('../models/map');

router.post('/search', (req, res, next) => {
    const { title, lat, lng } = req.body;
    let response = {
        message: ''
    }
    if (title != undefined || lat.toString() != 'NaN' || lng.toString() != 'NaN') {
        let filterData = {};
        title ? filterData.title = { $regex: title, $options: 'i' } : undefined;
        lat ? filterData.lat = Number(lat) : undefined;
        lng ? filterData.lng = Number(lng) : undefined;

        Map.find(filterData).then(result => {
            res.json(result);
        }).catch(err => res.status(400).json(err));
    } else {
        response.message = 'Seacrh map cannot be empty'
        res.status(400).json(response)
    }
});

router.get('/', (req, res, next) => {
    Map.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    const { title, lat, lng } = req.body;
    let response = {
        success: false,
        message: '',
        data: { _id: '', title: '', lat: null, lng: null }
    }
    if (title != undefined || lat != undefined || lng != undefined) {
        const map = new Map({
            title,
            lat,
            lng
        })
        map.save().then(result => {
            response.success = true;
            response.message = 'Data have been added';
            response.data._id = result.id;
            response.data.title = result.title;
            response.data.lat = result.lat;
            response.data.lng = result.lng;
            res.status(201).json(response);
        }).catch(err => {
            res.status(400).json(response);
        })
    } else {
        res.status(400).json(response);
    }
});

router.put('/:id', (req, res, next) => {
    const { title, lat, lng } = req.body;
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Map.findOneAndUpdate(
        { _id: req.params.id }, { title: title, lat: lat, lng: lng }
    ).then(result => {
        response.success = true;
        response.message = 'Data have been updated';
        response.data.title = title;
        response.data.lat = lat;
        response.data.lng = lng;
        res.status(201).json(response);
    }).catch(err => {
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res, next) => {
    let response = {
        success: false,
        message: '',
        data: {}
    }
    Map.findOneAndRemove(
        { _id: req.params.id }
    ).then(result => {
        response.success = true;
        response.message = 'Data have been deleted';
        response.data._id = req.params.id;
        res.status(201).json(response);
    }).catch(err => {
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
    Map.findById(id).then(result => {
        response.success = true;
        response.message = 'Data found';
        response.data._id = id;
        response.data.title = result.title;
        response.data.lat = result.lat;
        response.data.lng = result.lng;
        res.status(201).json(response);
    }).catch(err => {
        response.message = 'Datadate not found';
        res.status(500).json(err);
    })
});

module.exports = router;