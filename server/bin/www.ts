import './entrypoint';

import { logger } from '@modules/core';
import http from 'http';
// import { connect, connection } from 'mongoose';

import app from '@server/app';

const PORT = process.env.SERVER_PORT || 3000;

async function createServer() {
  // connection.once('open', async () => {
    logger.log('Connection database has been established successfully.');

    // await db.connection.db.dropDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.log(`app listening on port ${PORT}!`);
    });
  // });

  // await connect(process.env.MONGODB_URI);
}

createServer();
