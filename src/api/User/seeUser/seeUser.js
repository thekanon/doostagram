import { prisma } from "../../../../generated/prisma-client";
export default {
    Query: {
        seeUser: async(_, args) => {
            const {id} = args;
            
            // return prisma.user({id})
            const user = await prisma.user({id});
            const posts = await prisma.user({id}).posts();
            return {
                user,
                posts
            }
        }
    }
}