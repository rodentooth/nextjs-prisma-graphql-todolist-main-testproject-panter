import React, { FC } from "react";

import Link from "next/link";
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
  cursor: pointer;
`;

const FAB: FC = () => {
  const goToCreateNewTodoList = () => {
    window.location.assign("/viewTodoList/");
  };

  return <FABstyle onClick={goToCreateNewTodoList}>+</FABstyle>;
};

export default FAB;
