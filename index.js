const express = require('express')
const { CommentModel } = require('./models/comments');
const PostsModel = require('./models/posts');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const port = 3001

// Connection URI
const uri = "mongodb://localhost:27017/tripfia";
mongoose.connect(uri).then(() => {
    console.log('mongo connected');
    app.listen(port, function () {
        console.log('express server started');
    })
});
app.use(express.json())
app.use(cors())

app.get('/post/:postType/:postId', async (req, res) => {
    const { postType, postId } = req.params;
    try {
        const post = await PostsModel.findOne({ postType, postId });
        res.json(post);
    } catch (e) {
        res.json(e)
    }
});

app.put('/comment/:postType/:postId', async (req, res) => {
    const { text, userName, profileImage } = req.body;
    const { postType, postId } = req.params;
    try {
        const updatedPost = await PostsModel
            .findOneAndUpdate({ postType, postId },
                { $push: {comments: { text, userName, profileImage }}},
                {safe: true, upsert: true, new: true});
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.put('/like/:postType/:postId', async (req, res) => {
    const { postType, postId } = req.params;
    const { userId } = req.body;
    try {
        const updatedPost = await PostsModel
            .findOneAndUpdate({ postType, postId },
                { $push: { likes: { userId }}},
                {safe: true, upsert: true, new: true});
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.put('/unlike/:postType/:postId', async (req, res) => {
    const { postType, postId } = req.params;
    const { userId } = req.body;
    try {
        const updatedPost = await PostsModel
            .findOneAndUpdate({ postType, postId },
                { $pull: { likes: { userId }}},
                {safe: true, upsert: true, new: true});
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})