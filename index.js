const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect(process.env.MONGO_URI, () => console.log('MongoDB connected!'));

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json());
router(app);

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  })
}

// Server setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT);
console.log(`Server listening on ${PORT}`)

