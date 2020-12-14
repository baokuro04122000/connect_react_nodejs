var express = require('express');
var router = express.Router();
const { Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'react_nodejs',
  password: '123bao@@45',
  port: 8000,
})
/* GET home page. */
router.get('/sentData', function(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  pool.query('select * from product_info',(err,response)=>{
    if(err) throw console.log(err);
    res.send(response.rows);
  })
});
router.get('/addData',(req,res)=>{
  res.render('form_add',{});
})
router.post('/addData',(req,res)=>{
  let sql="insert into product_info(product_name,product_price,img) values ($1,$2,$3)";
  let data = [req.body.product_name,req.body.product_price,req.body.img];
  pool.query(sql,data,(err,response)=>{
    if(err) console.log(err);
    else res.send(response);
  })
})
module.exports = router;
