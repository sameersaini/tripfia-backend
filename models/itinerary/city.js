const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cities = new Schema({
    id: ObjectId,
    name: String,
    city_code: String,
    state_code: String,
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const CitiesModel = mongoose.model('Cities', Cities);
module.exports = CitiesModel;