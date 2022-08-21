import {
  booleanArg,
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./TodoList";

// did not work :(

// https://stackoverflow.com/questions/55824050/how-to-do-a-nested-mutation-resolver-with-nexus-prisma

export const TodoItemInputType = inputObjectType({
  name: "TodoItemInputType",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.boolean("isDone");
    t.nonNull.string("todoListId");
    t.nonNull.string("id");
  },
});

export const TodoItemInputMutation = extendType({
  type: "Mutation",

  definition(t) {
    t.field("createTodoItem", {
      type: "TodoItem",

      args: {
        data: TodoItemInputType,
        title: nonNull(stringArg()),
        isDone: nonNull(booleanArg()),
        todoListId: nonNull(stringArg()),
      },

      resolve(_root, args, context) {
        return context.prisma.todoItem.create({
          data: {
            id: uuidv4(),
            title: args.title,
            isDone: args.isDone,
            todoListId: args.todoListId,
          },
        });
      },
    });
  },
});
