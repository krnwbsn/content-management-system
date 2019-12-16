const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    letter: String,
    frequency: Number
});

module.exports = mongoose.model('Data', dataSchema);