import { prisma } from "../../../generated/prisma-client";
export default {
    User: {
      fullName: parent => {
        return `${parent.firstName} ${parent.lastName}`;
      },
      isFollowing: async (parent, _, { request }) => {
        const { user } = request;
        const { id: parentId } = parent;
        try {
            return prisma.$exists.user({
                AND: [
                  {
                    id: user.id
                  },
                  {
                    following_some: {
                      id: parentId
                    }
                  }
                ]
            });
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      isSelf: (parent, _, { request }) => {
        const { user } = request;
        const { id: parentId } = parent;
        return user.id === parentId;
      }
    },
    Post: {
        // isLiked가 Query으로 호출되면 parent(Post parent)를 id, request(요청데이터)를 user로 받는다.
        isLiked: (parent, _, {request}) => {
            const { user } = request;
            const { id } = parent;
            // exists는 존재 여부 확인에 쓰인다. 즉 아래 구문은 Post에 아래 조건에 해당하는 like가 있는지 확인하는 것이다.
            // 포스트 아이디가 존재하는지(당연한것), 요청데이터의 아이디와 포스트에 아이디가 일치하는지 확인한 뒤 리턴한다.
            // 여기에서 id는 parent이고, 
            console.log(user.id)
            console.log(id)
            console.log(user)
            console.log(parent)
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            })
        }
    }
  };