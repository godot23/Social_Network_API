const router = require("express").Router()

const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require("../../controllers/thoughtController")

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId/reactions").post(postReaction).delete(deleteReaction)

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);;

module.exports = router;