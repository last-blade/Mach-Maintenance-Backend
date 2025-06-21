import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB()
.then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    });

    console.log("Database connected!!");
})

.catch((error) => {
    console.log(`Error while connecting to database: ${error.message}`)    
})

.finally(() => {
    console.log("Database connection attempt finished!")
});