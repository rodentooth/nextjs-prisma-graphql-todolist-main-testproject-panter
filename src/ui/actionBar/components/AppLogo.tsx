import React, {FC} from "react";

import styled from "styled-components";


const AppTitle = styled.h1`

  margin: 10px;
  margin-left: 20px;
  font-size: 2em;
  font-family: "Amatic SC";
`;

const AppSubTitle = styled.h2`

  margin: 10px;
  margin-left: 25px;
  margin-top: -10px;

  font-size: 0.8em;
  font-family: "Roboto";
`;
const AppTitleDivider = styled.div`

  width: 100px;
  height: 1px;

  margin: 10px;
  margin-left: 20px;
  margin-top: -10px;
  background-color: black;
`;

const AppLogo: FC = () => {


    return <div>
                <AppTitle>ToPa</AppTitle>
                <AppTitleDivider/>
                <AppSubTitle>Todolist Panter</AppSubTitle>
    </div>
        ;
};

export default AppLogo;
