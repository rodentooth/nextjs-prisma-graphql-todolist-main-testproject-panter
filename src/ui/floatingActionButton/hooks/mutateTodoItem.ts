import {gql, useMutation, useQuery} from "@apollo/client";

const DELETE_TODO_ITEM_BY_LIST = gql`

  mutation deleteTodoItemByList ($todoListId: String!) {

    deleteTodoItemByList(todoListId: $todoListId) {

      title

    }

  }

`;


const ADD_TODO_ITEM = gql`

  mutation createTodoItem ($title: String!, $isDone: Boolean!, $todoListId: String!) {

    createTodoItem(title: $title, isDone: $isDone, todoListId: $todoListId) {

      
      title

      todoListId
      
      isDone
      
      id
      

    }

  }

`;
export const addItem = (options) => {
    return useMutation(ADD_TODO_ITEM, options);
};
export const removeItemsByList = (options) => {
    return useMutation(DELETE_TODO_ITEM_BY_LIST, options);
};
