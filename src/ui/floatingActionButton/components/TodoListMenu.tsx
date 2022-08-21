import React, { FC, useEffect, useState } from "react";

import Link from "next/link";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useMe } from "../../user/hooks/useMe";
import { Puff } from "react-loader-spinner";
import { set } from "next-auth/server/lib/cookie";
import { addItem, removeItemsByList } from "../hooks/mutateTodoItem";
import { addList, removeList, updateList } from "../hooks/mutateTodoList";
import { useColour } from "../hooks/useColour";

const FABstyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 999;

  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 30px;
  padding: 15px;
  border-radius: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: aquamarine;
  font-size: 2em;
  cursor: pointer;
`;
const FABstyleDelete = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 999;

  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 30px;
  padding: 15px;
  border-radius: 25px;
  position: fixed;
  bottom: 0;
  right: 120px;
  background-color: #ff7f7f;
  font-size: 1em;
  cursor: pointer;
`;
const ColourDotsSpace = styled.div`
  z-index: 999;

  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;

  position: fixed;
  bottom: 110px;
  right: 0;
  margin: 30px;
  margin-bottom: 0;
  font-size: 1em;
`;

const ColourItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px;
  width: 15px;
  height: 15px;
  margin: 5px;
  padding: 5px;
  border-radius: 25px;
  border: lightgray solid 3px;

  cursor: pointer;
`;

const TodoListMenu: FC = (submittedData) => {
  const [addTodoList, listMutationResult] = addList({
    onCompleted(data) {
      saveListItems(data.createTodoList);
    },
  });
  const [addTodoItem, itemMutationResult] = addItem({});
  const [deleteTodoList, deleteMutationResult] = removeList({
    onCompleted(data) {
      window.location.assign("/");
    },
  });
  const [updateTodoList, updateListMutationResult] = updateList({});
  const [currentColour, setCurrentColour] = useState(
    submittedData.initialColour
  );

  const [deleteTodoItems, deleteItemsMutationResult] = removeItemsByList({
    onCompleted(data) {
      saveListItems(submittedData.state);
    },
  });

  const [innerSaveButton, setInnerSaveButton] = useState({ html: "SAVE" });

  if (listMutationResult.loading)
    console.log(`Submitting... ${listMutationResult.data}`);

  if (listMutationResult.error)
    console.log(`Submission error! ${listMutationResult.error.message}`);
  if (itemMutationResult.error)
    console.log(`Submission error! ${itemMutationResult.error.message}`);

  const me = useMe().data?.me;
  if (!me) {
    console.log("me is undefined in SaveTodoList");
    return;
  }

  // https://stackoverflow.com/questions/57732965/does-oncompleted-works-with-usemutation
  const saveListItems = (data) => {
    let itemList = submittedData.todoListItems;

    console.log(data);
    itemList.map((e, i) =>
      addTodoItem({
        variables: { title: e.title, isDone: !!e.isDone, todoListId: data.id },
      })
    );
    setInnerSaveButton({ html: "   ✔   " });

    const timeout = setTimeout(() => {
      setInnerSaveButton({ html: "SAVE" });
    }, 3000);

    return () => clearTimeout(timeout);
  };

  const puff = () => {
    "  " + <Puff color="#00BFFF" height={20} width={20} /> + "  ";
  };

  const saveTodoList = () => {
    setInnerSaveButton({ html: puff });
    let title = submittedData.state.title;
    let id = submittedData.state.id;
    let ownerId = me.id;
    let colour = currentColour;
    console.log(id);

    if (id !== null && id !== "") {
      // update a list: update name,  delete all items, add all new items

      updateTodoList({ variables: { title: title, id: id, colour: colour } });
      deleteTodoItems({ variables: { todoListId: id } });
      console.log("updating");
    } else {
      addTodoList({
        variables: { title: title, ownerId: ownerId, colour: colour },
      });
      console.log({
        variables: { title: title, ownerId: ownerId, colour: colour },
      });
    }
  };

  const deleteList = () => {
    let id = submittedData.state.id;

    deleteTodoList({ variables: { id: id } });
  };

  const colours = [
    "#ffcdd2",
    "#d1c4e9",
    "#b3e5fc",
    "#c8e6c9",
    "#fff9c4",
    "#ffccbc",
  ];

  const handleColourPicker = (e) => {
    let obj = e.target.attributes.name.nodeValue;
    submittedData.setColour(obj);
    setCurrentColour(obj);
  };

  return (
    <div>
      <ColourDotsSpace>
        {colours.map((e, i) => (
          <ColourItem
            key={e}
            name={e}
            onClick={handleColourPicker}
            style={{ background: e }}
          ></ColourItem>
        ))}
      </ColourDotsSpace>
      <FABstyleDelete onClick={deleteList}>Delete</FABstyleDelete>
      <FABstyle onClick={saveTodoList}>
        <pre>{innerSaveButton.html}</pre>
      </FABstyle>
    </div>
  );
};

export default TodoListMenu;
