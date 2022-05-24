var msql = require('mysql')

var conn = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'amberapp4',
    dateStrings: true

})

conn.connect((err) => {
    if (!err)
        console.log('connect to database successfully')

    else
        console.log('Connection failed' + JSON.stringify(err, undefined, 2))

})

module.exports = conn