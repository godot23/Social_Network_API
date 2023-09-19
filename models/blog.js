const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, required: true},
    email: {type: String, required: true, unique: true, /*insert something here about matching valid email address*/},
    thoughts: [{type: Schema.Types.ObjectId, ref: "thought"}],
    friends: [{type: Schema.Types.ObjectId, ref: "user"}]


},
{
    toJSON: {
        getters: true
    }
}
);

const User = model('user', userSchema);

const reactionSchema = new mongoose.Schema({
    reactionId: {type: ObjectId, default: new ObjectId},
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
},
{
    toJSON: {
        getters: true
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true, maxLength: 280},
    createdAt: {type: Date, default: Date.now},
    userName: {type: String, required: true},
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true
    }
});

const Thought = model('thought', thoughtSchema);

module.exports = {Thought, User};

