import mongoose from 'mongoose';
// now get the env var
import dotenv from 'dotenv';
dotenv.config();
const DB_URI = process.env.DB_URI;
if (!DB_URI) {
    throw new Error("DB_URI is not defined in the .env file");
}
const concectDB = async () => {
    try {
        console.log('🔄Connecting to MongoDB...');
        await mongoose.connect(DB_URI);
        console.log('✅MongoDB connected successfully');
    }
    catch (error) {
        console.log("❌MongoDB connection error", error);
        process.exit(1);
    }
};
export default concectDB;
//# sourceMappingURL=DB.js.map