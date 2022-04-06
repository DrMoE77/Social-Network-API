const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String, 
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [{
        // Array of `_id` values referencing the `Thought` model
        
    }],

    friends: [{
        // Array of `_id` values referencing the `User(self-reference)` model
        
    }]
})

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})
module.exports=user