const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, required: true },
    email: { type: String, required: true, unique: true /*insert something here about matching valid email address*/ },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]


},
    {
        toJSON: {
            getters: true
        }
    }
);

const User = mongoose.model('User', userSchema);

const reactionSchema = new mongoose.Schema({
    reactionId: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},
    {
        toJSON: {
            getters: true
        }
    })

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    userName: { type: String, required: true },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true
        }
    });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { Thought, User };

