const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Countries = new Schema({
    id: ObjectId,
    name: String,
    country_code: String,
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const CountriesModel = mongoose.model('Countries', Countries);
module.exports = CountriesModel;