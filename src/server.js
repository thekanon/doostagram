import "./env"
// dotenv.config({path:path.resolve(__dirname, ".env")});

//GraphQL import
import { GraphQLServer } from "graphql-yoga";
//logger import
import logger from "morgan";

//스키마 import
import schema from "./schema"

//passport import 
// import passport from "passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

//Util(Mail) import
// import {sendSecretMail} from "./utils"
// sendSecretMail("dlengjs123@gmail.com","aaaaaaa@Z"); 당장 메일 보낼게 아니므로 일단 제거


//환경변수를 .env에서 읽어오도록 함
const PORT = process.env.PORT || 4000;
//GraphQL의 schema를 정의

//서버 생성 및 실행
const server = new GraphQLServer({ 
    schema, 
    context:({request}) => ({request, isAuthenticated}) 
});

//로거
// server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port: PORT},() => 
    console.log(`Server running on http://localhost:${PORT}`)
);
// express 이용하여 변수 require 변수 선언
var express = require('express');
// 미들웨어 변수 선언
var app = express();

// 클라이언트 정보 추가
var client_id = 'n3RO1LZqp6aV3zGYnzha';
var client_secret = 'rGLmrR9FZL';

//번역할 문장 가져옴(json으로 가져오면 좋을듯)
var query = "I want more. Choose a prettier dress.";

app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
});

//translate 
app.get('/translate', function (req, res) {
    try{
        var spawn = require("child_process").spawn; 
        var process = spawn('python',["./test.py"] );     
        process.stdout.on('data', function(data) { 
            res.send(data.toString()); 
        }) ;
    } catch(e) {
        console.error(e);
        res.send(process); 
    }
    // res.send(process); 
//    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//    var request = require('request');
//    var options = {
//        url: api_url,
//        form: {'source':'en', 'target':'ko', 'text':query},
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    request.post(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });
 });

