import passport from "passport";
import { Strategy, ExtractJwt} from "passport-jwt"
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

console.log(process.env.JWT_SECRET)

const verifyUser = async(payload, done) => {
    try {
        console.log("payload");
        const user = await prisma.user({id: payload.id});
        if(user !== null){
            return done(null,user);
        } else {
            return done(null,false);
        }
    }catch(error) {
        console.log("aaa");
        return done(error, false);
    }
};
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
console.log(jwtOptions)
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();