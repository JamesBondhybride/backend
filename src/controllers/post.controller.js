import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;
        if (!name || !description || !age) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const post = await Post.create({ name, description, age });
        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: "Posts retrieved successfully",
            posts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        // Basic valdation to check if the body is empty or not
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body cannot be empty!" });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" });
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export { createPost, getPosts, updatePost, deletePost };