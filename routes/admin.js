var express = require('express')
const conn = require('../db')
var router = express.Router()



router.get('/', (req, res) => {
    if (req.session.loggedin === true) {
    let sqlQuery = `SELECT Distinct
    st.id, 
    st.f_name,
    st.l_name,
    st.borrowed_books,
    lb.title,
    lb.book_description,
    lb.author,
    bt.availability,
    bl.date_borrowed,
    bl.return_date
FROM
    amberapp4.borrowed_list bl, amberapp4.students st, amberapp4.books bt, amberapp4.loan_books lb
WHERE bl.student_id = st.id
AND bl.book_id = bt.id
AND  lb.book_id = bt.id
AND lb.student_id = st.id`
   conn.query(sqlQuery,(err,rows)=>{
       if(err) throw err

       res.render('dashboard',{
           records: rows
       })
   })
} else{
    res.redirect('/login')
}

})



router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    sqlQuery = `DELETE FROM borrowrecords WHERE id =${id}`

    conn.query(sqlQuery,(err,rows)=>{
        if(err) throw err
        res.redirect('/admin')
    })

})

module.exports = router