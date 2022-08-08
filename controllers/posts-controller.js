const { Posts, Users } = require('../models')

const postsController = {

    createPost({params, body}, res) {
        Posts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {posts: _id}}, {new: true});
        })
        .then(dbPostsData => {
            if(!dbPostsData) {
                res.status(404).json({message: 'No posts found with this ID.'});
                return;
            }
            res.json(dbPostsData)
        })
        .catch(err => res.json(err)); 
    },

    getAllPosts(req,res) {
        Posts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbPostsData => res.json(dbPostsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getPostById({params}, res) {
        Posts.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbPostsData => {
            if(!dbPostsData) {
            res.status(404).json({message: 'No posts found with this ID.'});
            return;
        }
        res.json(dbPostsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    updatePost({params, body}, res) {
        Posts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No posts found with this ID.'});
                return;
            }
                res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    deletePost({params}, res) {
        Posts.findOneAndDelete({_id: params.id})
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No posts found with this ID.'});
                return;
            }
            res.json(dbPostsData);
            })
            .catch(err => res.status(400).json(err));
    },

    addReaction({params, body}, res) {
        Posts.findOneAndUpdate({_id: params.postId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbPostsData => {
        if (!dbPostsData) {
            res.status(404).json({message: 'No posts found with this ID.'});
            return;
        }
        res.json(dbPostsData);
        })
        .catch(err => res.status(400).json(err))

    },

    deleteReaction({params}, res) {
        Posts.findOneAndUpdate({_id: params.postId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No posts found with this ID.'});
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = postsController;