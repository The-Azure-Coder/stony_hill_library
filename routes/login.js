var express = require('express')
const conn = require('../db')
var router = express.Router()



router.get('/', (req, res) => {
    res.render('login', {
        page: 'login form'
    })

})

router.post('/auth', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;


    // connection.query("SELECT * FROM login WHERE  email = '"+ email  +"' AND BINARY password = '"+ password +"'", function(err, rows, fields) {
    conn.query(`SELECT * FROM amberapp4.users WHERE email = ? AND BINARY password = ?`, [email, password], function (err, rows, fields) {
        if (err) throw err
        // if login is incorrect or not found
        if (rows.length <= 0) {
            req.session.loggedin = false
            console.log(req.session);
            res.redirect('/login')
        }
        else { // if login found
            //Assign session variables based on login credentials                
            req.session.loggedin = true;
            req.session.f_name = rows[0].f_name;
            req.session.l_name = rows[0].l_name;
            req.session.is_admin = rows[0].is_admin;
            console.log(req.session);
            res.redirect('/admin');

        }
    })

})



// Logout user
router.get('/logout', function (req, res) {
    req.session.destroy();
    req.flash('success', 'Enter Your Login Credentials');
    res.redirect('/login/');
});

module.exports = router