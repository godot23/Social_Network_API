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

router.route('/').get(getUsers).post(createUser);

router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;