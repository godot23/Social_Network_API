const { User, Thought, Reaction } = require("../models/");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: "No user found with that ID" })
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(
                req.body
            )
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.params.userId,
                    $set: {
                        username: req.body.username,
                        email: req.body.email
                    }
                }
            );
            if (!user) {
                return res.status(404).json({ message: "no user with that ID found" })
            }
            return res.status(200).json({ message: "updated" })
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                {
                    _id: req.params.userId,
                }

            );
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }
            res.status(200).json({ message: "deleted" })
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const userData= await User.findOneAndUpdate(
                    {_id: req.params.userId,},
                    {$addToSet: {friends: req.params.friendId}},
                    {new: true}
                )
                if(!userData){
                    res.status(404).json({message: "user not found"})
                }
           res.status(200).json(userData)
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                {_id: req.params.userId,},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            )
            if(!userData){
                res.status(404).json({message: "user not found"})
            }
            res.status(200).json(userData)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}