const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datadateSchema = new Schema({
    letter: String,
    frequency: Number
});

module.exports = mongoose.model('Datadate', datadateSchema);