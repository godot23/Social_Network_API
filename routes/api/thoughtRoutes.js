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

router.route("/").get(getThoughts).post(createThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(postReaction).delete(deleteReaction)

router.route("/:_id").get(getSingleThought);

module.exports = router;