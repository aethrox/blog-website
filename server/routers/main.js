const express = require('express');
const router = express.Router();

// Routes
router.get('', (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  const locals = {
    title: "NodeJS Blog",
    description: "Simple blog created with NodeJS, Express & MongoDB"
  }
  res.render('index', { locals });
  // index.ejs dosyası, layout/main.ejs dosyasını kullanarak render edilecek
  // locals objesi, index.ejs dosyasına gönderilen verileri içerir
  // { locals } şeklinde gönderilen veriler, index.ejs dosyasında locals objesi olarak kullanılabilir
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router; // Router'ı dışarıya aktardık