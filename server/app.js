
const express = require('express');
const app = express();
let salam 


app.get('/hello',(req, res, next) => {
    res.json({
        message: salam
    })
}
)
app.listen('4000', ()=>{
    console.log('server started on 4000')
})

const {createPool} = require('mysql')
 
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    connectionLimit: 10
})

pool.query('SELECT * FROM ios.users', (err, result) => {
   salam = result
})

