import {gql, useMutation, useQuery} from "@apollo/client";


const ADD_TODO_LIST = gql`

  mutation createTodoList ($title: String!, $ownerId: String!, $colour: String!) {

    createTodoList(title: $title, ownerId: $ownerId, colour: $colour) {

      
      title

      ownerId
      
      id
      
      colorCode
      

    }

  }

`;

const DELETE_TODO_LIST = gql`

  mutation deleteTodoList ($id: String!) {

    deleteTodoList(id: $id) {

      id

    }

  }

`;

const UPDATE_TODO_LIST = gql`

  mutation updateTodoList ($id: String!, $title: String!, $colour: String!) {

    updateTodoList(id: $id, title: $title, colour: $colour) {

      id

    }

  }

`;
export const addList = (options) => {
    return useMutation(ADD_TODO_LIST, options);
};
export const updateList = (options) => {
    return useMutation(UPDATE_TODO_LIST, options);
};
export const removeList = (options) => {
    return useMutation(DELETE_TODO_LIST, options);
};
