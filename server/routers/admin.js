const express = require('express');
const router = express.Router();
const Post = require('../models/POST');
const User = require('../models/USER');
const bcrypt = require('bcrypt');
// bcrypt, şifreleri hashlemek ve karşılaştırmak için kullanılır
const jwt = require('jsonwebtoken');
// jsonwebtoken, token oluşturmak ve kontrol etmek için kullanılır

const adminLayout = '../views/layouts/admin'; // Admin layout dosyasının yolu
const jwtSecret = process.env.JWT_SECRET; // JWT secret key'i .env dosyasından alındı

// Check Login Route

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


router.get('/admin', async (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  try {
    const locals = {
      title: "Admin",
      description: "Simple blog created with NodeJS, Express & MongoDB"
    }

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

// Admin - Check Login Route

router.post('/admin', async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    // jwt.sign() fonksiyonu ile token oluşturduk ve secret key'i kullandık
    res.cookie('token', token, { httpOnly: true });
    // Oluşturduğumuz token'ı cookie'ye ekledik ve httpOnly true yaptık
    // httpOnly, cookie'ye sadece sunucu tarafından erişilebileceğini belirtir
    res.redirect('/dashboard');

  } catch (error) {
    console.log("Error: " + error.message);
  }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
  res.render('admin/dashboard');
});

// Admin - Register Route

router.post('/register', async (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  try {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // Şifreyi hashlemek için bcrypt.hash() fonksiyonunu kullandık (10 tur)

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'User already in use' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }

  } catch (error) {
    console.log("Error: " + error.message);
  }
});


module.exports = router;