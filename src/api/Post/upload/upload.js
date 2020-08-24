import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    //upload mutation이 실행되면 post를 생성하고 생성한 post에 file(url)을 추가한다
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;
      //createPost를 통해 Post를 생성한다. 파라미터는 caption과 user이다. user는 로그인 정보를 통해 받아온다,
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });
      //post가 생성되면 생성된 post의 id를 얻어와서 해당 post에 file을 생성한다. 
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      //결과값은 post이다.
      return post;
    }
  }
};