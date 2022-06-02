const mongoose = require('mongoose');
const { Comment } = require('./comments');
const { Like } = require('./likes');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Posts = new Schema({
    id: ObjectId,
    postId: { type: Number, index: true },
    postType: String,
    comments: { type: [Comment], default: []},
    likes: { type: [Like], default: [] },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

Posts.index( { postId: 1, postType: -1 });
const PostsModel = mongoose.model('Post', Posts);
module.exports = PostsModel;