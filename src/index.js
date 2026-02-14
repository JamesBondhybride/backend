import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
}); // Load environment variables from .env file

const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        console.log('Server is running...');
        app.on('error', (error) => {
            console.error('Server error:', error);
            throw error; // Rethrow the error to be caught by the outer try-catch
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

startServer();