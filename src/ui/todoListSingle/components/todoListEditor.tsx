import React, {FC, useState} from "react";

import styled from "styled-components";
import TodoListItem from "./todoListItem";
import TodoListMenu from "../../floatingActionButton/components/TodoListMenu";
import {gql, useQuery} from "@apollo/client";
import Link from "next/link";
import {v4 as uuidv4} from "uuid";
import {useAllTodoItemsFromList} from "../hooks/useTodoList";


const AddElement = styled.div`




  border: dotted grey 1px;
  border-radius: 20px;
  display: flex;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  width: 50%;
  text-align: center;
  background: rgba(255, 255, 255, 0.4);


`;

const TextInputItem = styled.input`




  border: solid grey 1px;
  border-radius: 20px;
  margin: 10px;
  margin-right: 5px;
  padding: 10px;
  min-width: 80%;
  background: rgba(255, 255, 255, 0.4);

`;


const TodoListTitle = styled.input`




  border: solid grey 1px;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  min-width: 78%;
  font-size: 1.2em;
  background: rgba(255, 255, 255, 0.4);


`;
const DeleteItem = styled.input`



  background: rgba(255, 255, 255, 0.4);

  border: solid grey 1px;
  border-radius: 5px;
  margin: auto;
  margin-right: 20px;
  padding: 5px;
  color: orangered;
  cursor: pointer;
  width: auto;
  display: flex;
  background-color: white;

`;

const ToDoItem = styled.div`




  display: flex;

`;




const TodoListEditor: FC = ({setColour}) => {


    // https://ibaslogic.com/simple-guide-to-react-form/


    const colours = ["#ffcdd2", "#d1c4e9", "#b3e5fc", "#c8e6c9", "#fff9c4", "#ffccbc"];

    const queryParams = new URLSearchParams(window.location.search)

    const id = queryParams.get("id")
    const title = queryParams.get("title")
    let listArgs = {todoListId: id}

    const initialColour  = id !== null?queryParams.get("colour"):colours[Math.floor(Math.random()*colours.length)];
    const [backgroundColour, setBackgroundColour] = useState(initialColour);

    let initialState = {title: "", id: ""}

    if (id !== null || id !== "") {
        initialState = {title: title == null ? "" : title, id: id}

    }

    setColour(backgroundColour)
    const setColourIntermediator = colour => {
        setColour(colour)
        setBackgroundColour(colour)
    }

    const [state, setState] = useState(initialState)
    const [todoListItems, setTodoListItems] = useState([])

    const {data, error, loading} = useAllTodoItemsFromList(
        {
            variables: listArgs,
            onCompleted: (data) => {
                const temp = new Array(data.allTodoItemsFromList.length);
                data.allTodoItemsFromList.map((e, i) => {
                    temp[i] = {title: e.title, isDone: e.isDone, position: uuidv4()};



                });

                setTodoListItems(temp)


            }
        });


    if (loading) {
        return <p>loading</p>
    }
    if (error && id !== null) {
        return <p>Oh no, something went wrong! {error.message}</p>
    }



    const handleChange = e => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setState({...state, [e.target.name]: value,})
    }

    const handleItemChange = e => {
        const temp = todoListItems;

        if (e.target.type === "checkbox") {
            temp[e.target.name].isDone = e.target.checked;
        } else {
            temp[e.target.name].title = e.target.value;

        }
        setTodoListItems([...temp])
    }


    const deleteItem = e => {

        let object = e.target;

        const temp = todoListItems;

        temp.splice(e.target.name, 1);
        setTodoListItems([...temp])


    }

    //https://stackoverflow.com/questions/40803828/how-can-i-map-through-an-object-in-reactjs


    const addNewTodoItem = () => {


        setTodoListItems([...todoListItems, {title: "", isDone: 0, position: uuidv4()}])

    }


    return <div >
        <p >Title:</p>
        <label>
            <TodoListTitle type="text"
                           name="title"
                           value={state["title"]}
                           onChange={handleChange}/>
        </label>

        <div>

            {
                todoListItems.map((e, i) =>
                    <ToDoItem key={e.position}>
                        <input type="checkbox"
                               name={i}
                               checked={e.isDone ? 1 : 0}
                               onChange={handleItemChange}/>

                        <TextInputItem
                            type="text"
                            name={i}
                            value={e.title}
                            onChange={handleItemChange}/>
                        <DeleteItem type="button" name={i} onClick={deleteItem} value={"x"}/>
                    </ToDoItem>
                )}
        </div>

        <AddElement onClick={addNewTodoItem}>Add Todo Item</AddElement>


        <TodoListMenu state={state} todoListItems={todoListItems} setColour={setColourIntermediator} initialColour={backgroundColour}/>
    </div>
        ;
};

export default TodoListEditor;
