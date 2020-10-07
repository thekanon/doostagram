import "./env"
// dotenv.config({path:path.resolve(__dirname, ".env")})

//GraphQL import
import { GraphQLServer } from "graphql-yoga"
//logger import
import logger from "morgan"

//스키마 import
import schema from "./schema"

//passport import 
// import passport from "passport"
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./middlewares"



//Util(Mail) import
import {sendSecretMail} from "./utils"
// sendSecretMail("dlengjs123@gmail.com","aaaaaaa@Z")


//환경변수를 .env에서 읽어오도록 함
const PORT = process.env.PORT || 4000
//GraphQL의 schema를 정의


//서버 생성 및 실행
const server = new GraphQLServer({ 
    schema, 
    context:({request}) => ({request, isAuthenticated}) 
})

//로거
// server.express.use(logger("dev"))
server.express.use(authenticateJwt)

server.start({port: PORT},() => 
    console.log(`Server running on http://localhost:${PORT}`)
)
// express 이용하여 변수 require 변수 선언
var express = require('express')
// 미들웨어 변수 선언
var app = express()

//Python 파일 경로
const path = require('path')
const pyPath = path.join(__dirname, 'api\\python\\bbc.py')


// 클라이언트 정보 추가
var client_id = 'n3RO1LZqp6aV3zGYnzha'
var client_secret = 'rGLmrR9FZL'

//번역할 문장 가져옴(json으로 가져오면 좋을듯)
var query = "Trump health monitored after weekend of confusion"

//크로스도메인 이슈 해결
const cors = require('cors');
app.use(cors());
app.listen(3000, function () {
    console.log(pyPath)
})
//translate 
app.get('/viewNews', function (req, res) {
    try{
        var spawn = require("child_process").spawn 
        var process = spawn('python',[pyPath] )
        process.stdout.on('data', function(data) { 
            // res = convertWebToString(data)
            // console.log(data.toString())
            res.send(convertWebToString(data))
            res.end()
            return
        }) 
        // process.stdout.pipe(res)
    } catch(error) {
        console.error(error)
        // res.send(process) //??
        res.status(500).send({error: error.message})
        res.end()
        return
    }
   
 })
app.get('/translate/:tran', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt'
    var request = require('request')
    var tran = req.params.tran
    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':tran},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     }
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json; charset=UTF-8'})
        res.end(body)
      } else {
        res.status(response.statusCode).end()
        console.log('error = ' + response.statusCode)
      }
    })
})
function convertWebToString(data) {
    //가져온 데이터가 Object 형태인데, 왜인지 모르겠지만 eval로 다시 초기화 하지 않으면 버퍼로 데이터를 가지고 있음
    var myJsonString = (data.toString());
    myJsonString = eval(myJsonString);
    return myJsonString
    // //eval로 초기화 시 array형태의 데이터 얻을 수 있음.
    // console.log(myJsonString)
    // 
}