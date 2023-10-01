const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json("failed to get users");
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(401).json("User does not exist");
      }
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchUser: async (req, res) => {
    try {
      const result = await User.aggregate([
        {
          $search: {
            index: "user",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      res.status(200).json(result);
      console.log("Search key:", req.params.key);
    } catch (error) {
      res.status(500).json("failed to get user");
    }
  },
};
