//importing required modules
const { Schema, model, Types } = require('mongoose')
const { formateddate } = require('../utils/time');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => formateddate(createdAtTime)
        }
    },
    {
        toJSON: {
            getters: true
        },id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => formateddate(createdAtTime) 
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true 
        },id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema)

module.exports = thought