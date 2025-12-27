import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './config/DB.js';
const PORT = process.env.PORT || 3000;
console.log("Initializing server...\n");
const startServer = async () => {
    try {
        await connectDB(); // wait to connect with mongo
        app.listen(PORT, () => {
            console.log(`server listen `);
        });
    }
    catch (error) {
        console.error("Failed to start the server\n", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map