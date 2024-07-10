const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const mongoose = require('mongoose');
const User = require('./models/user');
const connectDB = require('./connection/db'); 
const app = express();
const port = 3000;

connectDB();
// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public')); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("", (req, res) => {
    res.render('home');
});

app.get("/home", (req, res) => {
    res.render('home');
});

app.get('/panch-kedar', (req, res) => {
    res.render('panch-kedar'); 
  });

  app.get('/panch-badri', (req, res) => {
    res.render('panch-badri'); 
  });

  app.get('/panch-parayag', (req, res) => {
    res.render('panch-parayag'); 
  });


  app.get('/nainital', (req, res) => {
    res.render('nainital'); 
  });

  app.get('/rishikesh', (req, res) => {
    res.render('rishikesh'); 
  });
  app.get('/corbet', (req, res) => {
    res.render('corbet'); 
  });
  app.get('/itineraries', (req, res) => {
    res.render('itineraries'); 
  });


  app.get('/treks', (req, res) => {
    res.render('treks'); 
  });

  app.get('/accommodations', (req, res) => {
    res.render('accommodations'); 
  });

  app.get('/tourism-cir', (req, res) => {
    res.render('tourism-cir'); 
  });
  app.get('/homestay', (req, res) => {
    res.render('homestay'); 
  });

  app.get('/travle', (req, res) => {
    res.render('travle'); 
  });

  app.get('/homestay-registration', (req, res) => {
    res.render('homestay-registration'); 
  });

  app.get('/travel-trade', (req, res) => {
    res.render('travel-trade'); 
  });

  app.get('/destination-faq', (req, res) => {
    res.render('destination-faq'); 
  });

  app.get('/adventure', (req, res) => {
    res.render('adventure'); 
  });

  app.get('/homestay-faq', (req, res) => {
    res.render('homestay-faq'); 
  });

  app.get('/places', (req, res) => {
    res.render('places'); 
  });

  app.get('/religious', (req, res) => {
    res.render('religious'); 
  });

  app.get('/travel-faq', (req, res) => {
    res.render('travel-faq'); 
  });

  app.get('/traks-faq', (req, res) => {
    res.render('traks-faq'); 
  });

  app.get('/about', (req, res) => {
    res.render('about'); 
  });

  app.get('/awards', (req, res) => {
    res.render('awards'); 
  });

  app.get('/message', (req, res) => {
    res.render('message'); 
  });
  app.get('/contact', (req, res) => {
    res.render('contact'); 
  });

  app.get('/thank-you', (req, res) => {
    res.render('thank-you'); 
  });
  
  app.post('/submit', async (req, res) => {
    const { userName, state, city, pinCode, email, password, phone } = req.body;
    const errors = {};

    if (!userName || userName.length < 5) {
        errors.userName = "Username must be at least 5 characters long.";
    }
   if (!state || state.length < 3) {
    errors.state = "State must be at least 3 characters long.";
   }
   if (!city || city.length < 3) {
    errors.city = "City must be at least 3 characters long.";
    }
    if (!pinCode || pinCode.length < 6) {
      errors.pinCode = "Pincode must be at least 6 characters long.";
      }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        errors.email = "Please enter a valid email address.";
    }
    if (!phone || phone.length < 10) {
      errors.phone = "Phone number must be at least 10 characters long.";
      }

    if (!password || password.length < 8) {
        errors.password = "Password must be at least 6 characters long.";
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
        if (existingUser.userName === userName) {
            errors.userName = "Username already exists.";
        }
        if (existingUser.email === email) {
            errors.email = "Email already exists.";
        }
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
    } else {
      const newUser = new User({ userName, state, city, pinCode, email, password: hashedPassword, phone });
      await newUser.save();
        res.redirect('/thank-you');
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
