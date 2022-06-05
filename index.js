const express = require('express')
const PostsModel = require('./models/posts');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const getEnvData = require("./env");
const CountriesModel = require("./models/itinerary/country");
const port = 3001

const envData = getEnvData(process.env.ENV);

// Connection URI
const uri = envData.mongo.url;
mongoose.connect(uri).then(() => {
    console.log('mongo connected -> ' + uri);
    app.listen(port, function () {
        console.log('express server started');
    })
});
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.json("success");
});


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
    const { text, userName, profileImage, userId } = req.body;
    const { postType, postId } = req.params;
    try {
        const updatedPost = await PostsModel
            .findOneAndUpdate({ postType, postId },
                { $push: {comments: { text, userName, profileImage, userId }}},
                {safe: true, upsert: true, new: true});
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.put('/comment/edit/:postType/:postId/:commentId', async (req, res) => {
    const { commentText } = req.body;
    const { postType, postId, commentId } = req.params;
    try {
        const post = await PostsModel
            .findOne({ postType, postId });

        post.comments = post.comments.map(comment => {
            if(comment._id.equals(commentId)) {
                comment.text = commentText;
            }
            return comment;
        })
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.delete('/comment/:postType/:postId/:commentId', async (req, res) => {
    const { postType, postId, commentId } = req.params;
    try {
        const post = await PostsModel
            .findOne({ postType, postId });

        post.comments = post.comments.filter(comment => !comment._id.equals(commentId))
        const updatedPost = await post.save();

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

app.put('/like/:commentId/:postType/:postId', async (req, res) => {
    const { userId } = req.body;
    const { commentId, postType, postId } = req.params;
    try {
        const post = await PostsModel
            .findOne({ postType, postId });

        post.comments = post.comments.map(comment => {
            if(comment._id.equals(commentId)) {
                comment.likes.push({ userId })
            }
            return comment;
        })
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.put('/unlike/:commentId/:postType/:postId', async (req, res) => {
    const { commentId, postType, postId } = req.params;
    const { userId } = req.body;
    try {
        const post = await PostsModel
            .findOne({ postType, postId });

        post.comments = post.comments.map(comment => {
            if(comment._id.equals(commentId)) {
                comment.likes = comment.likes.filter(like => like.userId !== userId);
            }
            return comment;
        })
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})


app.get('/itinerary/countries', async (req, res) => {
    try {
        const countries = await CountriesModel
            .find({});
        res.json(countries);
    } catch (e) {
        console.log('returning error', e)
        res.json(e)
    }
})

app.get('/itinerary/country/:country/states', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'India'
        }
    ])
})

app.get('/itinerary/country/:countryId/state/:states/source', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'India'
        }
    ])
})

app.get('/itinerary/country/:countryId/state/:states/destination', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'India'
        }
    ])
})

app.get('/itinerary/travel-duration', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'India'
        }
    ])
})

app.get('/itinerary/travel-type', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'India'
        }
    ])
})