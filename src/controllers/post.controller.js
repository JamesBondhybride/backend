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
export { createPost };