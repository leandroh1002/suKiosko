require('dotenv').config();
// const { PORT, SYNC_FORCE } = process.env;
const { server } = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT ?? 3030

async function startServer() {
    try {
        await conn.authenticate();
        console.log('Connection successfully established with the database...');
        await conn.sync({ force: false });
        server.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
          })
    } catch (error) {
        console.error('Error starting server!', error);
    }
}

startServer();