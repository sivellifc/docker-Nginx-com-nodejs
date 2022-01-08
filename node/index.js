const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlInit = `CREATE TABLE IF NOT EXISTS people(name varchar(50) NOT NULL PRIMARY KEY)` 
connection.query(sqlInit)

const sql = `INSERT INTO people(name) values('Wesley_${Date.now()}')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    var response = '<h1>Full Cycle</h1>'
    const conn = mysql.createConnection(config)
    const sql = `SELECT name FROM people`
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(response + "<p>" + err.message + "</p>")
        }
        else {
            rows.forEach(function(row) {
                response += "<p>" + row.name + "</p>"
              });
            res.send(response)
        }
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
