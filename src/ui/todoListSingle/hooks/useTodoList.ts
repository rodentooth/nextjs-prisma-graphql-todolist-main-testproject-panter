import { gql, useQuery } from "@apollo/client";

const ALL_TODO_ITEMS_FROM_LIST = gql`
  query ($todoListId: String!) {
    allTodoItemsFromList(todoListId: $todoListId) {
      title
      id
      isDone
    }
  }
`;

const ALL_MY_TODO_LISTS = gql`
  query {
    myTodoList {
      title
      id
      colorCode
    }
  }
`;

export const useAllTodoItemsFromList = (options) => {
  return useQuery(ALL_TODO_ITEMS_FROM_LIST, options);
};
export const useAllTodoLists = (options) => {
  return useQuery(ALL_MY_TODO_LISTS, options);
};
