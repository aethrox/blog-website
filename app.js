require('dotenv').config(); // Burada .env dosyasını yükledik

const express = require('express'); // Express modülünü yükledik
const expressLayouts = require('express-ejs-layouts'); // Express Layouts modülünü yükledik

const connectDB = require('./server/config/db'); // Veritabanı bağlantısını yaptık

const app = express(); // Express uygulamasını başlattık
const PORT = 5000 || process.env.PORT; // Port numarasını belirledik (5000 veya .env dosyasındaki PORT)

// Connect to MongoDB
connectDB(); // MongoDB'ye bağlandık

app.use(express.static('public')); // Public dosyasını statik olarak belirledik

// Templating Engine
app.use(expressLayouts); // Express Layouts modülünü kullanacağımızı belirttik
app.set('layout', './layouts/main'); // Layout dosyasını belirledik
// Layout dosyası, genel olarak tüm sayfalarda kullanılacak olan HTML yapısını belirler
app.set('view engine', 'ejs'); // View Engine olarak EJS'i belirledik

app.use('', require('./server/routers/main')); // Main router'ı kullanacağımızı belirttik

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});