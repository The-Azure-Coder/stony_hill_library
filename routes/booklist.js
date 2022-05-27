var express = require('express')
var router = express.Router()
var conn = require('../db')


router.get('/', (req, res) => {
   let sqlQuery = `SELECT bt.id, bt.title, bt.book_description, bt.image,bt.author,bt.availability,ct.category FROM amberapp4.books bt, amberapp4.categories ct where bt.category_id = ct.id`
   conn.query(sqlQuery,(err,rows)=>{
       if(err) throw err
       res.render('booklist',{
           books: rows
       })
       console.log(rows)
      
   })
})

router.post('/category',(req,res)=>{
    let category = req.body.category
    let sqlQuery = `SELECT bt.id, bt.title, bt.book_description, bt.image,bt.author,bt.availability,ct.category FROM amberapp4.books bt, amberapp4.categories ct where bt.category_id = ct.id and ct.category LIKE '%${category}%'`
    conn.query(sqlQuery,(err,rows)=>{
        if(err) throw err
        res.render('booklist',{
            books: rows
        })
        console.log(rows)
    })

})

router.get('/add',(req,res)=>{
    let loanData ={
        title:req.body.title,
        book_description:req.body.book_description,
        author: req.body.author

    }
})



router.get('/borrow/:id',(req,res)=>{
    let id = req.params.id
    let sqlQuery = `SELECT bt.id, bt.title, bt.book_description, bt.image,bt.author,bt.availability,ct.category FROM amberapp4.books bt, amberapp4.categories ct where bt.category_id = ct.id and bt.id =${id}`

    conn.query(sqlQuery,(err,rows)=>{
        if(err)throw err
        res.render('borrowForm',{
            borrowedItem: rows[0]
        })

    })

})

// susususus

router.post('/borrowed',(req,res)=>{
    var student_ID = req.body.student_id;
    var Book_ID = req.body.book_id;

    let borrowData = {
         book_id: req.body.id,
         student_id: req.body.student_id,
         date_borrowed :new Date(Date.now()),
         return_date:new Date(Date.now() + 12096e5)
    }


    let studQuery = `SELECT * FROM students WHERE id = ${req.body.student_id}`
    conn.query(studQuery,(err,results)=>{
        if(results[0].borrowed_books < 2){

            let satusCheck = `SELECT * FROM books WHERE id =${req.body.id}`
            conn.query(satusCheck,(err,results)=>{
                if(results[0].availability > 0){

                    let loanData ={
                        title:req.body.title,
                        book_id: req.body.id,
                        student_id: req.body.student_id,
                        book_description:req.body.book_description,
                        author: req.body.author
                    }
                    let borrowQuery =`INSERT INTO borrowed_list SET ?`
                    let loanQuery = `INSERT INTO loan_books SET?`

                    
                    conn.query(borrowQuery,borrowData,(err,results)=>{
                        if(err) throw err

                        conn.query(loanQuery,loanData,(err,loanResults)=>{
                          if(err) throw err
                           let updateAvailability = `UPDATE books SET availability = availability - 1 WHERE id = ${req.body.id}`

                        conn.query(updateAvailability,(err,results)=>{
                            if (err) throw err
                            let updateborrowed = `UPDATE students SET borrowed_books = borrowed_books + 1 WHERE id = ${req.body.student_id}`
                            conn.query(updateborrowed,(err,results)=>{
                                if (err) throw err
                                req.flash('success','The book as been borrowed')
                                res.redirect('/booklist')

                            })

                        })

                       })
                    })
                }else{
                    req.flash('error','This book is not available')
                    res.redirect('/booklist')
                
                }

            })
        }else{
            req.flash('error2','Maximun rentals have been exceeded')
            res.redirect('/booklist')
        }
    })

})
module.exports = router