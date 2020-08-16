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
// sendSecretMail("dlengjs123@gmail.com","Kanon16Z@Z"); 당장 메일 보낼게 아니므로 일단 제거


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
