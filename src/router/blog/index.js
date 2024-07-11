"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../../model/Post");

router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find({}, 'url headline datePublished image.url');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });

  router.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  });

  router.post('/add-post', async (req, res) => {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  });

  router.post('/search', async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
  
      if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
      }
  
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const data = await Post.find({
        $or: [
          { headline: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });

      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error searching posts', error });
    }
  });

  router.get('/edit/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post) {        
        res.json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  });
  
  router.put('/edit-post/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, {
        headline: req.body.headline,
        datePublished: Date.now()
      }, { new: true });
      if (post) {
        res.json(post);
        // res.redirect(`/edit-post/${req.params.id}`);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  });

  router.delete('/delete-post/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (post) {
        res.json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error });
    }
  });

module.exports = router;
