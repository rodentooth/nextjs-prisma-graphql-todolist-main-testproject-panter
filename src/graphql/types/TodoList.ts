import {arg, extendType, list, nonNull, objectType, stringArg} from "nexus";
import {User} from "./User";
import {v4 as uuidv4} from "uuid";
import {TodoItem} from "./TodoItem";

export const TodoList = objectType({
    name: "TodoList",
    definition(t) {
        t.model.title();
        t.model.colorCode();
        t.model.ownerId();
        t.model.id();

        // not working https://www.youtube.com/watch?v=NaxQXClnYSE&list=PLn2e1F9Rfr6k6MwzS-p9FGK1NDBxxwLPk&index=14&ab_channel=Prisma


        t.list.field('owner', {
            type: User,
            async resolve(parent, _args, context) {
                return await context.prisma.todoList
                    .findUnique({
                        where: {
                            id: parent.id
                        },
                    })
                    .owner();

            }
        });


        t.list.field('items', {
            type: TodoItem,
            async resolve(parent, _args, context) {
                return await context.prisma.todoList
                    .findMany({
                        where: {
                            id: parent.id
                        },
                    })
                    .items();

            }
        });

    },
});


export const UsersTodoListsQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("myTodoList", {
            type: TodoList,
            resolve(root, args, context) {
                if (!context.session?.user.id) {
                    return null;
                }
                return context.prisma.todoList.findMany({
                    where: {ownerId: context.session.user.id},
                });
            },
        });
    },
});

export const AllTodoListsQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allTodoLists", {
            type: TodoList,
            resolve(root, args, context) {

                return context.prisma.todoList.findMany();
            },
        });
    },
});


export const InsertNewTodoList = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('createTodoList', {
            type: TodoList,
            args: {                                        // 1
                title: nonNull(stringArg()),                 // 2
                ownerId: nonNull(stringArg()),                  // 2
                colour: nonNull(stringArg()),                  // 2
            },
            resolve(_root, args, context) {
                const todoList = {
                    id: uuidv4(),
                    title: args.title,                         // 3
                    ownerId: args.ownerId,                           // 3
                    colorCode: args.colour,                           // 3
                }

                return context.prisma.todoList.create({data: todoList})

                //return todoList


            },

        })


    },
});


export const DeleteTodoList = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('deleteTodoList', {
            type: TodoList,
            args: {                                        // 1
                id: nonNull(stringArg()),                 // 2
            },
            resolve(_root, args, context) {


                return context.prisma.todoList.delete({
                        where: {id: args.id}
                    }
                )

                //return todoList


            },

        })


    },
});


export const UpdateTodoList = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('updateTodoList', {
            type: TodoList,
            args: {                                        // 1
                id: nonNull(stringArg()),                 // 2
                title: nonNull(stringArg()),                 // 2
                colour: nonNull(stringArg()),                 // 2
            },
            resolve(_root, args, context) {


                return context.prisma.todoList.update({
                        where: {id: args.id},
                        data: {title: args.title, colorCode: args.colour}
                    }
                )

                //return todoList


            },

        })


    },
});


export const InsertNewTodoListWithItems = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('createTodoListWithItems', {
            type: TodoList,
            args: {                                        // 1
                title: nonNull(stringArg()),                 // 2
                ownerId: nonNull(stringArg()),                  // 2
                colour: nonNull(stringArg()),                 // 2
                todoItems: nonNull(arg({type: list("TodoItemInputType")})),
            },
            resolve(_root, args, context) {

                const todoList = {
                    id: uuidv4(),
                    title: args.title,                         // 3
                    ownerId: args.ownerId,                           // 3
                    colorCode: args.colour,                           // 3
                    todoItems: {
                        createMany: {
                            data: args.todoItems
                        }

                    },
                }
                return todoList;

                return context.prisma.todoList.createMany({data: todoList})

                //return todoList


            },

        })


    },
});


