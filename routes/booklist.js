var express = require('express')
var router = express.Router()
var conn = require('../db')


router.get('/', (req, res) => {
   let sqlQuery = `SELECT * FROM amberapp4.books`
   conn.query(sqlQuery,(err,rows)=>{
       if(err) throw err
       res.render('booklist',{
           books: rows
       })
      
   })
})

router.post('/category',(req,res)=>{
    let category = req.body.category
    let sqlQuery = `SELECT * FROM amberapp4.books WHERE category LIKE '%${category}%'`
    conn.query(sqlQuery,(err,rows)=>{
        if(err) throw err
        res.render('booklist',{
            books: rows
        })
        console.log(rows)
    })

})


router.post('/add',(req,res)=>{
    let data = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        title: req.body.title,
        book_description: req.body.book_description,
        author: req.body.author,
        email: req.body.email
    }

    let sqlQuery = `INSERT INTO borrowrecords SET ?`

    conn.query(sqlQuery, data,(err,rows)=>{
        if(err)throw err

        res.redirect('/admin')
    })

})

router.get('/borrow/:id',(req,res)=>{
    let id = req.params.id
    let sqlQuery = `SELECT * FROM amberapp4.books  WHERE id =${id}`

    conn.query(sqlQuery,(err,rows)=>{
        if(err)throw err
        res.render('borrowForm',{
            borrowedItem: rows[0]
        })

    })

})
module.exports = router