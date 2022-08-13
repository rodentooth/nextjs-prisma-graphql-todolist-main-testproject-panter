import { extendType, objectType } from "nexus";
import {TodoList} from "./TodoList";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.image();
    t.model.name();
    /*
    t.list.field("myTodoLists",{
      type: TodoList,
      async resolve(parent, _args, context) {
        return await context.prisma.user
            .findUnique({
              where: {
                id: parent.id
              }
            })
            .myTodoLists();
      }
    });
     */
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: User,
      resolve(root, args, context) {
        if (!context.session?.user.id) {
          return null;
        }
        return context.prisma.user.findFirst({
          where: { id: context.session.user.id },
        });
      },
    });
  },
});


export const Query2 = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allUsers", {
      type: User,
      resolve(root, args, context) {

        return context.prisma.user.findMany();
      },
    });
  },
});

