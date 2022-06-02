const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const States = new Schema({
    id: ObjectId,
    name: { type: String, index: true },
    state_code: { type: String, index: true },
    country_code: String,
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const StatesModel = mongoose.model('States', States);
module.exports = StatesModel;