const express = require('express');
const router = express.Router();
const Post = require('../models/POST'); // Post modelini yükledik

// Routes
router.get('', async (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Simple blog created with NodeJS, Express & MongoDB"
    }

    let perPage = 10;
    let page = req.query.page || 1; // Sayfa numarasını alıyoruz (Varsayılan olarak 1)

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals, 
      data, 
      current: page, 
      nextPage: hasNextPage ? nextPage : null
    });
  } catch (error) { 
    console.log("Error: " + error.message);
  }

  // index.ejs dosyası, layout/main.ejs dosyasını kullanarak render edilecek
  // locals objesi, index.ejs dosyasına gönderilen verileri içerir
  // { locals } şeklinde gönderilen veriler, index.ejs dosyasında locals objesi olarak kullanılabilir
});

router.get('/about', (req, res) => {
  res.render('about');
});


// // Dinamik olarak 10 adet post oluşturmak için bir fonksiyon
// const generatePosts = (numPosts) => {
//   const posts = [];
//   for (let i = 1; i <= numPosts; i++) {
//     posts.push({
//       title: `Building a Blog ${i}`,
//       body: `This is the body text for post ${i}`
//     });
//   }
//   return posts;
// };

// // 10 adet post oluştur
// const posts = generatePosts(10);

// // Postları veritabanına ekle
// Post.insertMany(posts)
//   .then((docs) => {
//     console.log('Posts inserted:', docs);
//   })
//   .catch((err) => {
//     console.error('Error inserting posts:', err);
//   });

router.get('/post/:id', async (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  try {
    let slug = req.params.id;
    
    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple blog created with NodeJS, Express & MongoDB"
    }

    res.render('post', { locals, data });

  } catch (error) { 
    console.log("Error: " + error.message);
  }
});

router.post('/search', async (req, res) => { // Ana sayfa route'u oluşturduk (GET)
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({ 
      $or: [
        { title: { $regex: searchNoSpecialChar, $options: 'i' } },
        { body: { $regex: searchNoSpecialChar, $options: 'i' } }
      ]
    });

    const locals = {
      title: "Search",
      description: "Simple blog created with NodeJS, Express & MongoDB"
    }

    res.render('search', { locals, data });

  } catch (error) { 
    console.log("Error: " + error.message);
  }
});

module.exports = router; // Router'ı dışarıya aktardık