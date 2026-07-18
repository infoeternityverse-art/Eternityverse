import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { config } from './config/index.js';

const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`API server running on port ${config.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
