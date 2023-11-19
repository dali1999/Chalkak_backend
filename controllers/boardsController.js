// controllers/boardsController.js

const Board = require("../models/Boards");
const Post = require("../models/Post");
const Board = require("../models/Boards");

const boardsController = {
  // 모든 게시판 목록을 가져오는 함수
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find({});
      res.json(boards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 특정 게시판의 게시글을 가져오는 함수
  getPostsByBoard: async (req, res) => {
    try {
      const { boardId } = req.params;
      const posts = await Post.find({ board: boardId });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 게시글을 생성하는 함수
  createPost: async (req, res) => {
    try {
      const { boardId } = req.params;
      const newPost = new Post({
        ...req.body,
        board: boardId,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 게시글을 업데이트하는 함수
  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
      });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 게시글을 삭제하는 함수
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      await Post.findByIdAndDelete(postId);
      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBoard = new Board({ name, description });
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = boardsController;
