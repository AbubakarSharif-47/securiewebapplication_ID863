const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const validator = require('validator');
const logger = require('./logger');
const app = express();
const https = require('https');
const fs = require('fs');


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1/vulnDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('✅ Connected to MongoDB');
}).catch((err) => {
  logger.error('❌ MongoDB connection error: ' + err.message);
});

// Define User Schema (SECURE: hashed password)
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ✅ Safe Home Route
app.get('/', (req, res) => {
  logger.info('📄 Home page accessed');
  res.render('index');
});

// Registration Form
app.get('/register', (req, res) => {
  logger.info('📄 Registration page accessed');
  res.render('register');
});

// Security Checklist Page
app.get('/checklist', (req, res) => {
  logger.info('📄 Security checklist page accessed');
  res.render('checklist');
});

// ✅ Secure Registration Handler
app.post('/register', async (req, res) => {
  try {
    const username = validator.escape(req.body.username);
    const password = req.body.password;

    if (!validator.isLength(password, { min: 6 })) {
      logger.warn(`⚠️ Registration failed for user "${username}": Weak password`);
      return res.send('❌ Password must be at least 6 characters.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword
    });

    logger.info(`✅ User registered successfully: ${username}`);

    res.render('success', {
      title: 'Registration Successful',
      message: 'You can now login using your credentials.'
    });
  } catch (err) {
    logger.error('❌ Registration error: ' + err.message);
    res.send('❌ Registration error: ' + err.message);
  }
});

// Login Form
app.get('/login', (req, res) => {
  logger.info('📄 Login page accessed');
  res.render('login', { error: null });
});

// ✅ Secure Login Handler
app.post('/login', async (req, res) => {
  try {
    const username = validator.escape(req.body.username);
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      logger.info(`✅ Login successful for user: ${username}`);
      res.render('success', {
        title: 'Login Successful',
        message: `Welcome, ${user.username}!`
      });
    } else {
      logger.warn(`❌ Login failed for user: ${username}`);
      res.render('login', { error: '❌ Invalid username or password.' });
    }
  } catch (err) {
    logger.error('❌ Login error: ' + err.message);
    res.send('❌ Login error: ' + err.message);
  }
});

// Start the Server
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(httpsOptions, app).listen(3000, () => {
  logger.info('🔒 HTTPS server running at https://localhost:3000');
  console.log('🔒 HTTPS server running at https://localhost:3000');
});
