const mongoose = require("mongoose");

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



module.exports = reactionSchema;