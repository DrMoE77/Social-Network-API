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
        
    },
    thoughts: [{
        // Array of `_id` values referencing the `Thought` model
        
    }],

    friends: [{
        // Array of `_id` values referencing the `User(self-reference)` model
        
    }]
})


    // 
    `createdAt`
    
    // Date
     
   // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
  
  //`username` (The user that created this thought)
  // String
  // Required
  
  //`reactions` (These are like replies)
    // Array of nested documents created with the `reactionSchema`
  