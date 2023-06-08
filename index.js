const express = require('express')
const app = express()
const port = 5000

app.set("view engine","ejs")
app.use(express.static('public'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.listen(port,function(){
  console.log("서버연결 성공");
});

app.get('/', (req, res) => {
  res.render("index.ejs")
})
app.get('/test', (req, res) => {
  res.render("test.ejs")
})
