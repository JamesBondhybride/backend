import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    console.log("=== Register endpoint hit ===");
    console.log("Request body:", req.body);
    console.log("Content-Type:", req.headers['content-type']);
    
    try {
        const { username, email, password } = req.body;
        console.log("Extracted values:", { username, email, password });
        
        // Validate input
        if (!username || !email || !password) {
            console.log("Validation failed - missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }
        
        console.log("Validation passed, checking existing user...");
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).json({ message: "User already exists" });
        }
        
        console.log("Creating new user...");
        
        // Create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        
        console.log("User created successfully");
        
        res.status(201).json({ message: "User registered successfully", user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }});
    } catch (error) {
        console.log("Error caught:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        // checking if user exists
        const { email, password} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Comparing password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user: {
            id: user._id,
            username: user.username,
            email: user.email
        }});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Update user's logged-in status to false
        const { email } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({ message: "Logout successful"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export { registerUser, loginUser, logoutUser };