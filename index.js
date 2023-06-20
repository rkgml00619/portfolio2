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

/* passport  passport-local  express-session 설치후 불러오기 > 로그인 검정 및 세션 생성에 필요한 기능 사용*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret :'secret', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 


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

/* 로그인했을 때 검증하는 코드 */
passport.use(new LocalStrategy({
  usernameField:"memberId",
  passwordField:"memberPass",
  session:true,
  },      //해당 name값은 아래 매개변수에 저장
  function(memberId, memberPass, done) {
                  //회원정보 콜렉션에 저장된 아이디랑 입력한 아이디랑 같은지 체크                                 
    db.collection("members").findOne({ memberId:memberId }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      //비밀번호 체크 여기서 user는 db에 저장된 아이디의 비번값 (위의 function(err, "user")에서 받아온 값)
      if (memberPass == user.memberPass) {
          return done(null, user)
        } else {
          return done(null, false)
        }
    });
  }
));

//처음 로그인 했을 시 세션 생성 memberid는 데이터에 베이스에 로그인된 아이디
// 세션을 만들어주는 함수 : serializeUser
passport.serializeUser(function (user, done) {
  done(null, user.memberId)
});

//다른 페이지(서브페이지,게시판 페이지 등 로그인 상태를 계속 표기하기 위한 작업)
//로그인이 되어있는 상태인지 체크
                                // 세션의 user.memberid값을 가져오는 것
                                passport.deserializeUser(function (memberId, done) {
                                  //db의 값과 // 로그인했을 때 아이디 가 일치하면 로그인 유지
    db.collection('members').findOne({memberId:memberId }, function (err,result) {
        done(null, result);
      })
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
    // console.log(newClothes.length);
    res.render("index.ejs", {data: result, newClothes: newClothes, newAcc: newAcc});
  })
})
// 제품 목록
app.get('/shop/:category', (req, res) => {
  db.collection("product").findOne({category: req.params.category}, (err, result)=>{
    db.collection("product").find().toArray((err, total)=>{
      let categoryClothes = [];
      let categoryAcc = [];
      let totalData;

      for(let i = 0; i < total.length; i++){
        if(total[i].category === "clothes"){
          categoryClothes[categoryClothes.length] = total[i]
        }
        else if(total[i].category === "acc"){
          categoryAcc[categoryAcc.length] = total[i]
        }
      }

      if(req.params.category === "clothes"){
        totalData = categoryClothes.length;
      }
      else if(req.params.category === "acc"){
        totalData = categoryAcc.length;
      }            
      let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
      let perPage = 16; // 한페이지에서 보여질 상품갯수
      let blockCount = 5; // 한페이지에서 보여질 페이지 넘버 갯수
      let blockNum = Math.ceil(pageNumber / blockCount);
      let blockStart = ((blockNum - 1) * blockCount) + 1;
      let blockEnd = blockStart + blockCount - 1;
      let totalPaging = Math.ceil(totalData / perPage);

      if(blockEnd > totalPaging){
        blockEnd = totalPaging;
      }

      let totalBlock = Math.ceil(totalPaging / blockCount)
      let startFrom = (pageNumber - 1) * perPage;

      db.collection("product").find().sort({num: -1}).skip(startFrom).limit(perPage).toArray((err, result)=>{
        res.render("shop/shop_list.ejs", {
          data: result,
          totalPaging: totalPaging,
          blockStart : blockStart,
          blockEnd : blockEnd,
          blockNum : blockNum,
          totalBlock : totalBlock,
          pageNumber : pageNumber,

        })
      })
    })
  })
})

// 제품 등록
app.get('/shop/edit/register', (req, res) => {
  res.render("shop/shop_register.ejs")
})

// 제품 등록 데이터
const cpUpload = upload.fields([{ name: 'prdImg'}, {name: 'addPrdImg'} ,{ name: 'detailImg'}]);
app.post("/shop/edit/register/data",cpUpload,(req,res)=>{
  // console.log(req.files["addPrdImg"])

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

  db.collection("count").findOne({title: "상품갯수"}, (err, countResult)=>{
    db.collection("product").insertOne({
      num: countResult.num,
      category: req.body.category,
      prdName: req.body.prdName,
      prdImg : prdImgs,
      addPrdImg : addPrdImgs,
      detailImg: detailImgs,
      detailTxt: req.body.detailTxt,
      price: req.body.price,
      color: req.body.color,
      size: req.body.size,
      
    }, (err, result)=>{
      db.collection("count").updateOne({title: "상품갯수"}, {$inc: {num:1}}, (err, result)=>{
        res.redirect(`/shop/detail/${countResult.num}`);
      })
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
    // console.log(result.detailImg);
    res.render("shop/shop_detail.ejs", {data: result});
  })
})

// 제품 상세 데이터를 기반으로 구매페이지
app.get("/order", (req, res)=>{
  
});

// 회원가입 페이지
app.get("/members/join", (req, res) => {
  res.render("members/join.ejs")
})

//아이디 중복체크 요청
app.post("/idcheck",(req,res)=>{
  db.collection("members").findOne({memberId: req.body.memberId}, (err, member)=>{
       res.send({member:member})
  })
})

// 회원가입 데이터
app.post("/members/join/data", (req, res)=>{
  db.collection("members").findOne({memberId: req.body.memberId}, (err, member)=>{
    db.collection("count").findOne({title: "회원"}, (err, result)=>{
      db.collection("members").insertOne({
        memberNo: result.memberCount,
        meberName: req.body.meberName,
        memberTel_one: req.body.memberTel_one,
        memberTel: req.body.memberTel,
        memberTel_three: req.body.memberTel_three,
        memberEmail: req.body.memberEmail,
        emailTextSel: req.body.emailTextSel,
        memberId: req.body.memberId,
        memberPass: req.body.memberPass,
      }, (err, result)=>{
        db.collection("count").updateOne({title: "회원"}, {$inc: {memberCount: 1}}, (err)=>{
            res.send("<script> alert('회원가입 완료'); location.href ='/members/join' </script>")
        })
      })
    })
  })
});

// 로그인
app.get("/members/login", (req, res) => {
  res.render("members/login.ejs")
})

// 마이페이지
app.get("/members/mypage", (req, res) => {
  res.render("members/myPage.ejs")
})