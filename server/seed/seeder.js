const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const dataDate = require('../models/datadate');

const fs = require('fs');

fs.readFile("./seed/data.json", "utf8", (err, data) => {
    if (err)
        throw err;
    let list = JSON.parse(data);
    dataDate.insertMany(list, () => console.log("Import Completed"));
});