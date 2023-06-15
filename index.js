const express = require('express')
const app = express()
const port = 5000

const MongoClient = require('mongodb').MongoClient;

// 파일업로드 기능인 multer를 사용하기 위한 명령어들 불러들임
const multer  = require('multer')

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

//파일 첨부 후 서버에 전달 할 때 multer library 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload') //업로드 폴더 지정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    //영어가 아닌 다른 파일명 안깨지고 나오게 처리
  }
})

//upload는 위의 설정사항을 담은 변수(상수) 
const upload = multer({ storage: storage })

// 메인 페이지
app.get('/', (req, res) => {
  db.collection("product").find().sort({num: -1}).toArray((err, result)=>{
    let newClothes = [];
    let newAcc = [];
    
    for(let i = 0; i < result.length; i++){
      if(result[i].category === "clothes"){
        newClothes[newClothes.length] = result[i]
      }
      else if(result[i].category === "acc"){
        newAcc[newAcc.length] = result[i]
      }
    }
    // console.log(newClothes.length);
    // console.log(newAcc[0].num);
    res.render("index.ejs", {data: result, newClothes: newClothes, newAcc: newAcc});
  })
})
// 제품 목록
app.get('/shop/:category', (req, res) => {
  db.collection("product").findOne({category: req.params.category}, (err, result)=>{
    db.collection("product").find().sort({num:-1}).toArray((err,result)=>{
      //게시글 목록 데이터 전부 가지고 와서 목록페이지로 전달
      res.render("shop/shop_list.ejs",{data:result})
    })
  })
})
// 제품 상세
app.get('/shop/detail/:num', (req, res) => {  
  db.collection("product").findOne({num: Number(req.params.num)}, (err, result)=>{

    // color 값을 무조건 배열로 가져올 수 있도록
    if (result && typeof result.color === 'string') {
      result.color = [result.color]; 
    }

    res.render("shop/shop_detail.ejs", {data: result});
  })
})

// 제품 등록
app.get('/shop/edit/register', (req, res) => {
  res.render("shop/shop_register.ejs")
})
// 제품 등록 데이터

const cpUpload = upload.fields([{ name: 'prdImg'}, {name: 'addPrdImg'} ,{ name: 'detailImg'}]);

app.post("/shop/edit/register/data",cpUpload,(req,res)=>{

  // console.log(req.files)
  // console.log(req.files["prdImg"])
  // console.log(req.files["detailImg"])
  console.log(req.files["addPrdImg"])

  let prdImgs = [];
  let addPrdImgs = [];
  let detailImgs = [];

  for(let i = 0; i < req.files["prdImg"].length; i++){
    prdImgs[i] = req.files["prdImg"][i].filename;
  }

  for(let i = 0; i < req.files["addPrdImg"].length; i++){
    addPrdImgs[i] = req.files["addPrdImg"][i].filename;
  }

  for(let i = 0; i < req.files["detailImg"].length; i++){
    detailImgs[i] =  req.files["detailImg"][i].filename;
  }

  // db.collection("count").findOne({title: "상품갯수"}, (err, countResult)=>{
  //   db.collection("product").insertOne({
  //     num: countResult.num,
  //     category: req.body.category,
  //     prdName: req.body.prdName,
  //     prdImg : prdImgs,
  //     addPrdImg : addPrdImgs,
  //     detailImg:detailImgs,
  //     price: req.body.price,
  //     color: req.body.color,
  //     size: req.body.size,
      
  //   }, (err, result)=>{
  //     db.collection("count").updateOne({title: "상품갯수"}, {$inc: {num:1}}, (err, result)=>{
  //       res.redirect(`/shop/detail/${countResult.num}`);
  //     })
  //   })
  // })
})