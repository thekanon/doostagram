import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        console.log(args);
        return prisma.$subscribe.message({
          AND: [
            { mutation_in: "CREATED" },
            {
              node: {
                room_some: { id: roomId }
              }
            }
          ]
        })
        .node();
      },
      resolve: payload => payload
    }
  }
};