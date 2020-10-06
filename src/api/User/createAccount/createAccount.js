import {prisma} from "../../../../generated/prisma-client";
export default {
    Mutation:{
        createAccount: async (_, args) =>{
            const { username, email, firstName="", lastName="", bio=""} = args;
            const user = await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            // return user; 20201006 return user 시 데이터 에러 발생함(boolean 값이어야 함)
            return true;
        }
    }
}
