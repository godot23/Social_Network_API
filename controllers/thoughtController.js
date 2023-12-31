const { User, Thought, Reaction } = require("../models/blog");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                req.status(404).json({ message: "no thought found with that ID" })
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thought: thought.id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "thought created, but no user found with this id" })
            }
            res.json({ message: "thought created" })
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                {runValidators: true, new: true})
                
            if (!thought) {
                return res.status(404).json({ message: "No post with that ID" })
            }
            res.json(thought)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.body.thoughtId },
                { $removeFromSet: { thought: thought._id } }
            );
            if (!thought) {
                return res.status(404).json({ message: "thought not found" });
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async postReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body}, },
                { new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: "no reaction with that ID found" })
            }
            res.status(200).json(reaction)
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete(
                { _id: req.body.reactionId },
                { $pop: { reactionBody: reaction._id } }
            )
            if (!reaction) {
                return res.status(404).json({ message: "no reaction with that ID found" })
            }
            res.json({ message: "reaction deleted" })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}