const {User, Thought, Reaction} = require("../models/blog");

module.exports = {
    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res){
        try{
            const user = await User.findOne({_id: req.params.thoughtId});
            if(!user){
                req.status(404).json({message: "No user found with that ID"})
            }  
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async createUser(req, res){
        try{
            const user = await User.create(
                {username: req.body.username},
                {email: req.body.email}
            )
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body.username}
            );
            if(!user){
                return res.status(404).json({message: "no user with that ID found"})
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete(
                {_id: req.body.id},
                {$removeFromSet: {user: user._id}}
            );
            if(!user){
                return res.status(404).json({message: "user not found"})
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async addFriend(req, res){
        try{
            const user = await User.findOneAndAdd(
                {_id: req.body.id},
                {$addToSet: {friends: user._id}}
            )
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteFriend(req, res){
        try{
            const user = await User.findOneAndDelete(
                {_id: req.body.id},
                {$removeFromSet: {friends: user._id}}
            )
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}