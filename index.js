const express = require('express')
const app = express()
const port = 5000

const MongoClient = require('mongodb').MongoClient;

app.set("view engine","ejs")
app.use(express.static('public'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


let db; //데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)

MongoClient.connect("mongodb+srv://rkgml00619:!!rkals1010@cluster0.dujoq6u.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("portfolio2");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});

app.get('/', (req, res) => {
  res.render("index.ejs")
})
app.get('/shop/clothes', (req, res) => {
  res.render("shop/shop_list.ejs")
})
app.get('/shop/detail', (req, res) => {
  res.render("shop/shop_detail.ejs")
})

app.get('/shop/register', (req, res) => {
  res.render("shop/shop_register.ejs")
})
app.post('/prddata', (req, res)=>{
  db.collection("product").insertOne({
    category: req.body.category,
    prdName: req.body.prdName,
    price: req.body.price,
    prdImg: req.body.prdImg,
    detail: req.body.detail,
  }, (err, result)=>{
    
  });
})