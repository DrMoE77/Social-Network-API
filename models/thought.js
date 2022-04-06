import mongoose from 'mongoose';
const { Schema } = mongoose;
const moment=require("moment")

const thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 200,
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAttime) => moment(createdAttime).format('DD MM YYYY, hh:mm a')
    },

    username: {
        type: String, 
        required: true,
    },

    reactions: {
        type: String, 
        required: true,
    },
    
})

const reactionSchema = new Schema({
    reactionId: {
    //Default value is set to a new ObjectId
        type:mongoose.Schema.Types.ObjectId(),
        default:'thought'
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, 
        
    },

    username: {
        type: String, 
        required: true,
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAttime) => moment(createdAttime).format('DD MM YYYY, hh:mm a')
    },
    
})

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})
module.exports=thought
  
 
  
  
  
