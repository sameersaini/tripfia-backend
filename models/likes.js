const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Like = new Schema({
    id: ObjectId,
    userId: { type: String, index: true },
});

const LikeModel = mongoose.model('Like', Like);
module.exports = {
    Like,
    LikeModel
};