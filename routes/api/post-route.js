const router = require('express').Router();

const { 
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePost,
    deletePost,
    addReaction,
    deleteReaction

} = require('../../controllers/posts-controller');

router.route('/').get(getAllPosts);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost); 

router.route('/:userId').post(createPost);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;