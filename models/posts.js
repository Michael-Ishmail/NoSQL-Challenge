const { Schema, Types, model } = require('mongoose')
const moment = require('moment')

const reactionsSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        postDate: {
            type: Date,
            default: Date.now,
            get: (postDateVal) => moment(postDateVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const postsSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        postBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        postDate: {
            type: Date,
            default: Date.now,
            get: (postDateVal) => moment(postDateVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

postsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Posts = model('posts', postsSchema)

module.exports = Posts