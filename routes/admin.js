var express = require('express')
const conn = require('../db')
var router = express.Router()



router.get('/', (req, res) => {
    if (req.session.loggedin === true) {
    let sqlQuery = `SELECT * FROM borrowrecords`
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

module.exports = router