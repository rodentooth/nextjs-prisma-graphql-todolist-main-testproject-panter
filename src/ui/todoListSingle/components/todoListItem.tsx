import React, {FC, useState} from "react";

import styled from "styled-components";

const FABstyle = styled.div`


  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 999;

  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 30px;
  padding: 5px;
  border-radius: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: aquamarine;
  font-size: 3em;

`;

const TodoListItem: FC = () => {


    const [state, setState] = useState({title: "", item1: "", item1_done: false})


    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value,})
    }


    return <div>
        <label>
            <input
                name="item1_done"
                type="checkbox"
                //checked={this.state.isGoing}
                onChange={handleChange}/>

            <input type="text"
                   name="item1"
                //value={title}
                   onChange={handleChange}/>
        </label>
    </div>
        ;
};

export default TodoListItem;
