const mongoose = require("mongoose");
const reactionSchema = require("./Reactions")

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

const Thought = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thought;