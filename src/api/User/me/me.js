import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      console.log(userProfile)
      const posts = await prisma.user({ id: user.id }).posts();
    //   return {
    //     user: userProfile,
    //     posts
    //   };
        return await prisma.user({ id: user.id });
    }
  }
};