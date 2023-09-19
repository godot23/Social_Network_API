const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require("../../controllers/userController")

router.route('/').get(getUsers).post(createUser).put(updateUser).delete(deleteUser);

router.route("/:userID/friends/:friendId").post(addFriend).delete(deleteFriend);

router.route("/:_id").get(getSingleUser)

module.exports = router;