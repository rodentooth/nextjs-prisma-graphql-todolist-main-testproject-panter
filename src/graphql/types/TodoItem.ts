import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./TodoList";

export const TodoItem = objectType({
  name: "TodoItem",
  definition(t) {
    t.model.title();
    t.model.isDone();
    t.model.todoListId();
    t.model.id();

    // not working https://www.youtube.com/watch?v=NaxQXClnYSE&list=PLn2e1F9Rfr6k6MwzS-p9FGK1NDBxxwLPk&index=14&ab_channel=Prisma
    t.list.field("belongsToList", {
      type: TodoList,
      async resolve(parent, _args, context) {
        return await context.prisma.todoItem
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .belongsToList();
      },
    });
  },
});

export const InsertTodoItem = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTodoItem", {
      type: TodoItem,
      args: {
        // 1
        title: nonNull(stringArg()), // 2
        todoListId: nonNull(stringArg()), // 2
        isDone: nonNull(booleanArg()), // 2
      },
      resolve(_root, args, context) {
        const todoList = {
          id: uuidv4(),
          title: args.title, // 3
          todoListId: args.todoListId, // 3
          isDone: args.isDone, // 3
        };

        return context.prisma.todoItem.create({ data: todoList });

        //return todoList
      },
    });
  },
});

export const allTodoItemsFromList = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allTodoItemsFromList", {
      type: TodoItem,
      args: {
        // 1
        todoListId: nonNull(stringArg()), // 2
      },
      resolve(root, args, context) {
        return context.prisma.todoItem.findMany({
          where: { todoListId: args.todoListId },
        });
      },
    });
  },
});

export const DeleteTodoItemByList = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteTodoItemByList", {
      type: TodoItem,
      args: {
        // 1
        todoListId: nonNull(stringArg()), // 2
      },
      resolve(_root, args, context) {
        return context.prisma.todoItem.deleteMany({
          where: { todoListId: args.todoListId },
        });
      },
    });
  },
});
