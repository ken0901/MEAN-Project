const express = require("express");

const PostController = require("../controller/posts");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");



router.post("", checkAuth, extractFile ,PostController.createPost);

router.get("", PostController.getPosts);

router.delete("/:id", checkAuth, PostController.deletePost);

router.put("/:id", extractFile, PostController.updatePost);

router.get("/:id", PostController.getPost);

module.exports = router;