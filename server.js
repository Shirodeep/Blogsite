const express = require( 'express');
const morgan = require( 'morgan');
const mongoose = require( 'mongoose');
const Blog = require( './modules/blog.js');
const Form= require('./modules/login');

const app = express();

const dbase = 'mongodb+srv://test-node:testnode@skaldl.knctw.mongodb.net/node-test?retryWrites=true&w=majority';
mongoose.connect(dbase, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000) + console.log("connected to the database!"))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.redirect('/blogs');
});
app.get('/home', (req, res) =>{
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{
    res.render('about', { title: 'about'});
});

app.get('/contact', (req, res) =>{
    res.render('contact', { title: 'contact'});
});

app.get('/blogs', (req, res) =>{
    Blog.find().sort({createdAt: -1})
     .then((result) =>{
         res.render('home', {title: "All Blogs", blogs: result})
     })
     .catch((err) =>{
         console.log(err);
     })
});

app.post('/blog', (req, res) =>{
    const blog = new Blog(req.body);
    blog.save()
     .then((result) => {
         res.redirect('/blogs');
     })
     .catch((err) =>{
         console.log(err);
     })
});

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
      .then((result) =>{
          res.render('details', {title: "details", blog: result});
      })
      .catch((err) =>{
          console.log(err);
      });
})

app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err));
})

app.get('/addblogs', (req, res) =>{
    res.render('addblogs', {title: "Add blog"});
})
app.get('/login', (req, res) =>{
    res.render('loginpage', {title: "Blogs-Login"})
});
app.post('/login' ,(req, res)=>{
    const loginForm = new Form
});
app.use((req, res) =>{
    res.render('error', {title: '404ERROR'});
});