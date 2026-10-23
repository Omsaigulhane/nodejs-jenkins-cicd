'use strict';

const express = require('express');

const app = express();

// Root route — confirms the CI/CD pipeline is operational
app.get('/', (req, res) => {
  res.send('Hello! My DevOps CI/CD pipeline is working.');
});

// Health-check route — used by load balancers and container orchestrators
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Only start listening when this file is run directly (not when imported by tests)
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app so tests can import it without starting the server
module.exports = app;
