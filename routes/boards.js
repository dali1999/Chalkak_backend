const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");

// 모든 게시판 목록을 가져오는 라우트
router.get("/", boardsController.getAllBoards);

// 특정 게시판의 게시글을 가져오는 라우트
router.get("/:boardId/posts", boardsController.getPostsByBoard);

// 게시글을 생성하는 라우트
router.post("/:boardId/posts", boardsController.createPost);

// 게시글을 업데이트하는 라우트
router.put("/posts/:postId", boardsController.updatePost);

// 게시글을 삭제하는 라우트
router.delete("/posts/:postId", boardsController.deletePost);

module.exports = router;
