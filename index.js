import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import appRoutes from './routes/appRoutes';
import shopifyRoutes from './routes/shopifyRoutes';

// DB Setup
mongoose.connect(process.env.MONGO_URI, () => console.log('MongoDB connected!'));

// App setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

// Routes
appRoutes(app);
shopifyRoutes(app);

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

