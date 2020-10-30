// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

/*Get Route for Displaying Add List page - Create Operation*/
router.get('/add', (req,res,next) =>{
  res.render('books/index', {
    title: 'Books',
    books: books
  })
});
/*Post Route for Processing Add List page - Create Operation*/
router.post('/add', (req,res,next) =>{
  let newbook = Book({
    "name" : req.body.name,
    "author": req.body.author,
    "Genre": req.body.genre,
    "price": req.body.price,
    });
    Book.create(newbook, (err, Book) =>{
    if(err)
    {
    console.log(err);
    res.end(err);
    }
    else
    {
      //refresh the book list
      res.redirect('/books');
    }
    });
});
/*Get Route for Displaying Add Edit page - Update Operation*/
router.get('/edit/:id', (req,res,next) =>{
  let id = req.params.id;
Book.findById(id, (err, bookToEdit) =>
{
if(err){
  console.log(err);
res.end(err);
}
else{
  //show edit view
  res.render('book/edit', {title: 'Edit Book', book: bookToEdit,
  displayName: req.user ? req.user.displayName : ''})
}
});
});
/*Post Route for Processing Add Edit page - Update Operation*/
router.post('/edit/:id', (req,res,next) =>{
  let id =req.params.id

  let updateBook = Book({
    "_id": id,
    "name" : req.body.name,
    "author": req.body.author,
    "Gerne": req.body.Gerne,
    "price": req.body.price,
  });
  Book.updateOne({_id: id}, updateBook, (err) =>{
  if(err)
  {
    console.log(err);
  res.end(err);
  }
  else
  {
    // refresh the book list
    res.redirect('/books');
  }
  });
});
/*Get to perform Book Deletion - Delete Operation*/
router.get('/delete/:id', (req,res,next) =>{
  let id =req.params.id;

  Book.remove({_id: id}, (err) =>{
if(err){
  console.log(err);
res.end(err);
}
else{
  // refresh the book list
  res.redirect('/books');
}
  });
});
module.exports = router;
